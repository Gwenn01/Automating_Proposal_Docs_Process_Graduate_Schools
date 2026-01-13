from flask import Blueprint, jsonify
from database.connection import get_db_connection

proposals_bp = Blueprint("proposals", __name__)


@proposals_bp.route("/my-proposals/<int:user_id>", methods=["GET"])
def get_user_proposals(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                proposal_id,
                title,
                file_path,
                status,
                submission_date
            FROM proposals_docs
            WHERE user_id = %s
            ORDER BY submission_date DESC
        """, (user_id,))

        proposals = cursor.fetchall()

        return jsonify({
            "proposals": proposals
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()
