from flask import Blueprint
from controller.data_controller import get_data_controller

data_bp = Blueprint('data_bp', __name__)
@data_bp.route('/get-data', methods=['POST'])
def get_data():
    return get_data_controller()