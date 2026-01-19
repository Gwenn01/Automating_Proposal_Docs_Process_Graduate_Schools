from flask import Blueprint, request
from controller.registration_controller import register_user

registration_bp = Blueprint('registration', __name__)

@registration_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return register_user(data)
