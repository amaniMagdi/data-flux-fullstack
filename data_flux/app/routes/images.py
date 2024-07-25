from flask import Blueprint, request, jsonify, send_from_directory, current_app
import os
from ..extensions import db
from PIL import Image
import cv2
import numpy as np
from werkzeug.utils import secure_filename

#from ..services.image_service import ImageService

images_bp = Blueprint('images', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_image(file):
    try:
        Image.open(file).verify()
        return True
    except (IOError, SyntaxError) as e:
        return False

@images_bp.route('/upload', methods=['POST'])
def upload_images():
    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    files = request.files.getlist('images')
    if not files:
        return jsonify({'error': 'No files provided'}), 400

    file_paths = []
    for file in files:
        if not allowed_file(file.filename):
            return jsonify({'error': f'File {file.filename} is not an allowed image type'}), 400
        
        if not is_image(file):
            return jsonify({'error': f'File {file.filename} is not a valid image'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        file_paths.append(file_path)
    
    return jsonify({'message': 'Images uploaded', 'file_paths': file_paths}), 201
# To list all images 
@images_bp.route('/list-images', methods=['GET'])
def list_images():
    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    files = [f for f in os.listdir(UPLOAD_FOLDER) if allowed_file(f)]
    file_urls = [os.path.join('/images/media', f) for f in files]
    return jsonify({'images': file_urls})
#to retrieve iamge
@images_bp.route('/media/<filename>')
def serve_image(filename):
    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    return send_from_directory(UPLOAD_FOLDER, filename)

# Color histogram: shows the distribution of colors in an image

@images_bp.route('/color-histogram', methods=['POST'])
def color_histogram():
    data = request.json
    image_name = data.get('image_name')
    image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], image_name)

    if not image_path:
        return jsonify({'error': 'No image path provided'}), 400

    if not os.path.isfile(image_path):
        return jsonify({'error': 'Image file does not exist'}), 400

    try:
        # Read the image
        image = cv2.imread(image_path)

        if image is None:
            return jsonify({'error': 'Failed to load image, check the file path and format'}), 400

        # Calculate histograms
        histograms = {
            'b': cv2.calcHist([image], [0], None, [256], [0, 256]).flatten().tolist(),
            'g': cv2.calcHist([image], [1], None, [256], [0, 256]).flatten().tolist(),
            'r': cv2.calcHist([image], [2], None, [256], [0, 256]).flatten().tolist()
        }
        return jsonify(histograms)

    except cv2.error as e:
        return jsonify({'error': 'OpenCV error: ' + str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error: ' + str(e)}), 500

# Segmentation mask
@images_bp.route('/segmentation-mask', methods=['POST'])
def segmentation_mask():
    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    try:
        data = request.json
        image_name = data.get('image_name')
        image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], image_name)
        k = data.get('k', 2)  # Number of clusters for segmentation

        if not image_path or not os.path.isfile(image_path):
            return jsonify({'error': 'Invalid image path'}), 400
        
        if not isinstance(k, int) or k <= 0:
            return jsonify({'error': 'Invalid number of clusters'}), 400

        # Read and preprocess the image
        image = cv2.imread(image_path)
        if image is None:
            return jsonify({'error': 'Failed to load image'}), 400
        
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        pixel_values = image.reshape((-1, 3))
        pixel_values = np.float32(pixel_values)

        # Apply K-means clustering
        _, labels, centers = cv2.kmeans(pixel_values, k, None,
                                        (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2), 
                                        10, cv2.KMEANS_RANDOM_CENTERS)
        
        centers = np.uint8(centers)
        segmented_image = centers[labels.flatten()]
        segmented_image = segmented_image.reshape(image.shape)

        # Save the segmented image
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        segmented_path = os.path.join(UPLOAD_FOLDER, f'segmented_{os.path.basename(image_path)}')
        cv2.imwrite(segmented_path, cv2.cvtColor(segmented_image, cv2.COLOR_RGB2BGR))

        return jsonify({'segmented_image_path': segmented_path})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Image manipulation, resize, crop and format conversion. 
@images_bp.route('/manipulate-image', methods=['POST'])
def manipulate_image():
    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    data = request.json
    image_name = data.get('image_name')
    image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], image_name)
    action = data.get('action')
    params = data.get('params', {})

    if not image_path or not os.path.exists(image_path):
        return jsonify({'error': 'Invalid image path'}), 400

    try:
        # Open the image using Pillow
        image = Image.open(image_path)
    except (IOError, FileNotFoundError):
        return jsonify({'error': 'Failed to load image'}), 400

    # Convert the image to RGB if it is not already
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    manipulated_path = None

    try:
        if action == 'resize':
            new_size = tuple(params.get('size', (100, 100)))
            image = image.resize(new_size)
        elif action == 'crop':
            box = tuple(params.get('box', (0, 0, 100, 100)))
            image = image.crop(box)
        elif action == 'convert':
            format = params.get('format', 'JPEG').upper()
            if format not in ['JPEG', 'PNG', 'GIF']:
                return jsonify({'error': 'Unsupported image format'}), 400
            output_path = os.path.splitext(image_path)[0] + f'.{format.lower()}'
            image.save(output_path, format=format)
            manipulated_path = output_path
        else:
            return jsonify({'error': 'Invalid action'}), 400

        if action != 'convert':
            manipulated_path = os.path.join(UPLOAD_FOLDER, f'manipulated_{os.path.basename(image_path)}')
            image.save(manipulated_path)

        return jsonify({'manipulated_image_path': manipulated_path})

    except Exception as e:
        return jsonify({'error': f'Image manipulation failed: {str(e)}'}), 500