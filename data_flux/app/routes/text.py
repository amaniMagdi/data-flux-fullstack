from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models import TextData
from ..services.text_service import TextService

text_bp = Blueprint('text', __name__)

@text_bp.route('/text', methods=['POST'])
def upload_text():
    text = request.get_json().get('text')
    text_data = TextData(text=text)
    db.session.add(text_data)
    db.session.commit()
    analysis_result = TextService.analyze_text(text)
    return jsonify(analysis_result)
