from flask import Blueprint
from controller.admin_controller import get_all_docs_controller
manage_docs_bp = Blueprint('manage_docs', __name__)

@manage_docs_bp.route('/get-all-docs')
def get_all_docs():
    return get_all_docs_controller()