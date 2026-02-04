from flask import request, jsonify
from model.general.get_notifications import get_notifications

def get_notifications_controller():
    try:
        ...
        data = request.get_json()
        user_id = data.get("user_id")
        notifications = get_notifications(user_id)
        return jsonify(notifications), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500