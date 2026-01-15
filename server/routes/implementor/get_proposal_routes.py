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

@proposals_bp.route("/my-proposals-review/<int:user_id>", methods=["GET"])
def get_user_proposal_review(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                p.proposal_id,
                p.title,
                p.file_path,
                p.status,
                p.submission_date,

                r.review_id,
                r.comments,
                r.decision,
                r.review_date,

                u.user_id AS reviewer_id,
                u.fullname AS reviewer_name,
                u.email AS reviewer_email,
                u.role AS reviewer_role

            FROM proposals_docs p
            LEFT JOIN proposal_reviews r
                ON p.proposal_id = r.proposal_id
            LEFT JOIN users u
                ON r.user_id = u.user_id
                AND u.role = 'reviewer'

            WHERE p.user_id = %s
            ORDER BY p.submission_date DESC, r.review_date DESC
        """, (user_id,))

        results = cursor.fetchall()

        return jsonify({
            "proposals": results
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

