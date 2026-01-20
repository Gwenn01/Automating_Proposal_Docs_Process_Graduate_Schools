from flask import Blueprint, request
from controller.admin_controller import get_overview_data_controller

admin_overview_bp = Blueprint('admin_overview_bp', __name__)

@admin_overview_bp.route('/admin-overview', methods=['GET'])
def get_admin_overview():
    return get_overview_data_controller()
    
   