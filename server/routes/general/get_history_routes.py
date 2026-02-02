from flask import Blueprint
from controller.history_conttroller import (
    get_history_controller, 
    get_history_data_controller
)

history_bp = Blueprint('history_bp', __name__)

@history_bp.route('/get-history')
def get_history():
    return get_history_controller()

@history_bp.route('/get-history-data')
def get_history_data():
    return get_history_data_controller()