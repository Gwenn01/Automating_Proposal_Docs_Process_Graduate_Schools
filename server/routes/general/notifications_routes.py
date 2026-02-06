from flask import Blueprint, request
from controller.notification_controller import (
    get_notifications_controller,
    update_read_notifications_controller
)

notifications_bp = Blueprint('notifications_bp', __name__)

@notifications_bp.route('/get-notifications', methods=['POST'])
def get_notifications():
    # Get notifications from the database
    return get_notifications_controller()

@notifications_bp.route('/update-read-notifications', methods=['POST'])
def update_read_notifications():
    # Update the read status of notifications in the database
    return update_read_notifications_controller()