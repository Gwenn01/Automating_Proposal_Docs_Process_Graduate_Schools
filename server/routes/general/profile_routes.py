from flask import Blueprint, request, jsonify
from controller.profile_controller import get_profile_controller, update_profile_controller

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/get-profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    return get_profile_controller(user_id)

@profile_bp.route('/put-profile/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
    return update_profile_controller(user_id)
