from flask import request, jsonify
from werkzeug.security import check_password_hash
from middleware.login_validator import validate_login_data
from model.login_model import get_user_by_email

def login_user(data):
    #  Validate input
    errors = validate_login_data(data)
    if errors:
        return jsonify({
            "message": "Validation failed",
            "errors": errors
        }), 400

    try:
        user = get_user_by_email(data["email"])

        #  SECURITY: generic error message
        if not user or not check_password_hash(user["password"], data["password"]):
            return jsonify({
                "message": "Invalid email or password"
            }), 401

        #  Login success (never return password)
        return jsonify({
            "message": "Login successful",
            "user": {
                "user_id": user["user_id"],
                "fullname": user["fullname"],
                "email": user["email"],
                "role": user["role"]
            }
        }), 200

    except Exception:
        #  Do NOT expose internal error details
        return jsonify({
            "message": "Something went wrong. Please try again."
        }), 500
