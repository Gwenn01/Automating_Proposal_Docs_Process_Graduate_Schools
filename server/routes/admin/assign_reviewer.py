from flask import Blueprint
from controller.admin_controller import get_all_documents_with_user_controller

assign_reviewer_bp = Blueprint('assign_reviewer_bp', __name__)

@assign_reviewer_bp.route('/get-docs-user', methods=['GET'])
def assign_reviewer():
    return get_all_documents_with_user_controller()