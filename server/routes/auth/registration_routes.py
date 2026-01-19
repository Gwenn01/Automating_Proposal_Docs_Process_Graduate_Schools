from flask import Blueprint
from controller.registration_controller import register_user

registration_bp = Blueprint('registration', __name__)

@registration_bp.route('/register', methods=['POST'])
def register():
    return register_user()
