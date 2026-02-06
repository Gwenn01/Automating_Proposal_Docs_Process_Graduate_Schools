from flask import request, jsonify
from model.general.get_notifications import get_notifications
from model.general.update_read_notification_db import update_read_notification_db

def get_notifications_controller():
    try:
        ...
        data = request.get_json()
        user_id = data.get("user_id")
        notifications = get_notifications(user_id)
        return jsonify(notifications), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def update_read_notifications_controller():
    try:
        ...
        data = request.get_json()
        user_id = data.get("user_id")
        notification_id = data.get("notification_id")
        # Call the function to update the notifications
        success = update_read_notification_db(user_id, notification_id)
        if success:
            # ...
            return jsonify({"message": "Notifications updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update notifications"}), 500
        # ...
    except Exception as e:
        return jsonify({"error": str(e)}), 500