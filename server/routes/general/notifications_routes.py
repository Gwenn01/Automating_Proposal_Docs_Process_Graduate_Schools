from flask import Blueprint, request
from controller.notification_controller import get_notifications_controller

notifications_bp = Blueprint('notifications_bp', __name__)

@notifications_bp.route('/get-notifications', methods=['POST'])
def get_notifications():
    # Get notifications from the database
    return get_notifications_controller()