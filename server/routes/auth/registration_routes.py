from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from database.connection import get_db_connection

registration_bp = Blueprint('registration', __name__)

@registration_bp.route('/register', methods=['POST'])
def register():
    data = request.json

    fullname = data.get('fullname')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    campus = data.get('campus')
    department = data.get('department')
    position = data.get('position')

    if not fullname or not email or not password or not role:
        return jsonify({"message": "Missing required fields"}), 400

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Insert into users table
        cursor.execute("""
            INSERT INTO users (fullname, email, password, role)
            VALUES (%s, %s, %s, %s)
        """, (fullname, email, hashed_password, role))

        conn.commit()
        user_id = cursor.lastrowid

        # Insert instructor info if role is instructor
        if role == 'implementor':
            cursor.execute("""
                INSERT INTO implementor_info (user_id, campus, department, position)
                VALUES (%s, %s, %s, %s)
            """, (
                user_id,
                campus,
                department,
                position
            ))
            conn.commit()

        return jsonify({"message": "Registration successful"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()
