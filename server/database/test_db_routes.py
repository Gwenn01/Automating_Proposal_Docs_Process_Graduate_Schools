from flask import Blueprint, jsonify
from database.connection import get_db_connection

test_db_bp = Blueprint("test_db", __name__)

@test_db_bp.route("/test-connection", methods=["GET"])
def test_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "message": f"Connected to database: {db_name[0]}"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
