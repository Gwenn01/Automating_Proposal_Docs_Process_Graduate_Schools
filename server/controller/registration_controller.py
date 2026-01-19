from flask import request, jsonify
from werkzeug.security import generate_password_hash
from middleware.registration_validator import validate_registration_data
from model.registration_model import create_user, create_implementor_info

def register_user(data):
    #  Validate
    errors = validate_registration_data(data)
    if errors:
        return jsonify({
            "message": "Validation failed",
            "errors": errors
        }), 400

    try:
        hashed_password = generate_password_hash(data["password"])

        #  Create user
        user_id = create_user(
            data["fullname"],
            data["email"],
            hashed_password,
            data["role"]
        )

        #  Create implementor info if needed
        if data["role"] == "implementor":
            create_implementor_info(
                user_id,
                data.get("campus"),
                data.get("department"),
                data.get("position")
            )

        return jsonify({"message": "Registration successful"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
