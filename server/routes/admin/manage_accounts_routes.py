from flask import Blueprint, request, jsonify
from database.connection import get_db_connection
from werkzeug.security import generate_password_hash

manage_accounts_bp = Blueprint("manage_accounts/view", __name__)

@manage_accounts_bp.route("/manage-accounts", methods=["GET"])
def get_all_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                user_id,
                fullname,
                email,
                role
            FROM users
            ORDER BY fullname ASC
        """)

        users = cursor.fetchall()

        return jsonify({
            "users": users
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@manage_accounts_bp.route("manage-account/edit/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json

    fullname = data.get("fullname")
    email = data.get("email")
    role = data.get("role")

    if not fullname or not email or not role:
        return jsonify({"message": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE users
            SET fullname = %s,
                email = %s,
                role = %s
            WHERE user_id = %s
        """, (fullname, email, role, user_id))

        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"message": "User not found"}), 404

        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@manage_accounts_bp.route("/manage-account/delete/<int:user_id>", methods=["DELETE"])
def delete_account(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            DELETE FROM users
            WHERE user_id = %s
        """, (user_id,))

        if cursor.rowcount == 0:
            return jsonify({"message": "User not found"}), 404

        conn.commit()

        return jsonify({
            "message": "Account deleted successfully"
        }), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@manage_accounts_bp.route("/reset-password/<int:user_id>", methods=["PUT"])
def reset_password(user_id):
    data = request.json
    new_password = data.get("password")

    if not new_password:
        return jsonify({"message": "Password required"}), 400

    hashed = generate_password_hash(new_password)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE users SET password=%s WHERE user_id=%s",
        (hashed, user_id)
    )
    conn.commit()

    return jsonify({"message": "Password reset successful"}), 200



