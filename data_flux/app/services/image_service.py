import cv2

# Contain the business logic and interact with the data layer

class ImageService:
    @staticmethod
    def process_image(image_path):
        image = cv2.imread(image_path)
        # Perform image processing
        return image
