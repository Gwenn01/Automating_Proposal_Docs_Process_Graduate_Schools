from flask import Blueprint, jsonify
from database.connection import get_db_connection

get_docs_reviewer_bp = Blueprint("get_docs_reviewer", __name__)

@get_docs_reviewer_bp.route("/get-proposals-reviewer/<int:user_id>", methods=["GET"])
def get_proposals_reviewer(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                a.assignment_id,
                a.reviewer_id,
                a.proposal_id,
                a.assigned_date,
                a.status AS assignment_status,

                p.title,
                p.file_path,
                p.status AS proposal_status,
                p.submission_date
            FROM proposal_assignments a
            INNER JOIN proposals_docs p
                ON a.proposal_id = p.proposal_id
            WHERE a.reviewer_id = %s
        """, (user_id,))

        proposals = cursor.fetchall()

        return jsonify({
            "success": True,
            "proposals": proposals
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

    finally:
        cursor.close()
        conn.close()
