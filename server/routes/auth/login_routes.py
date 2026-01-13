from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from database.connection import get_db_connection

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()

        if not user:
            return jsonify({"message": "User not found"}), 404

        if not check_password_hash(user['password'], password):
            return jsonify({"message": "Incorrect password"}), 401

        # Login success
        return jsonify({
            "message": "Login successful",
            "user": {
                "user_id": user['user_id'],
                "fullname": user['fullname'],
                "email": user['email'],
                "role": user['role']
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()
