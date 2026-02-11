from flask import jsonify, request
from model.general.get_post_profile_db import (
    get_profile,
    put_profile_implementor,
    put_profile_reviewer
)
from werkzeug.security import generate_password_hash, check_password_hash

def get_profile_controller(user_id):
    ...
    try:
        profile = get_profile(user_id)
        return jsonify(profile)
    except Exception as e:
        return jsonify({"error": str(e)})
    
def update_profile_controller(user_id):
    ...
    try:
        ...
        user_type = request.json.get("user_type")
        fullname = request.json.get("fullname")
        email = request.json.get("email")
        password = request.json.get("password")
        hashed_password = generate_password_hash(password)
        campus = request.json.get("campus")
        department = request.json.get("department")
        position = request.json.get("position")
        
        if user_type == "implementor":
            success = put_profile_implementor(user_id, fullname, email, hashed_password, campus, department, position)
            if success:
                return jsonify("Profile updated successfully"), 200
            else:
                return jsonify("Profile update failed"), 400
        elif user_type == "reviewer":
            success = put_profile_reviewer(user_id, fullname, email, hashed_password)
            if success:
                return jsonify("Profile updated successfully"), 200
            else:
                return jsonify("Profile update failed"), 400
        else:
            return jsonify({"error": "Invalid user type"})   
    except Exception as e:
        return jsonify({"error": str(e)})