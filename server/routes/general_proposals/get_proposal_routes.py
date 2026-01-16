from flask import Blueprint, jsonify
from database.connection import get_db_connection

proposals_bp = Blueprint("proposals", __name__)

#get all proposals docs by implementor
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
                reviewer_count,
                reviewed_count,
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

# get proposal docs by reviewer

# get proposal docs by admin


@proposals_bp.route("/my-coverpage-proposals/<int:proposal_id>", methods=["GET"])
def get_user_coverpage_proposals(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
           SELECT * FROM proposal_cover_page p
            WHERE p.proposal_id = %s;
            ORDER BY submission_date DESC
        """, (proposal_id,))

        cover_pages = cursor.fetchall()

        return jsonify({
            "cover_pages": cover_pages
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()
   
        
@proposals_bp.route("/my-content-proposals/<int:proposal_id>", methods=["GET"])
def get_user_content_proposals(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
           SELECT * FROM proposal_content c
            WHERE c.proposal_id = %s;
            ORDER BY submission_date DESC
        """, (proposal_id,))

        cover_pages = cursor.fetchall()

        return jsonify({
            "cover_pages": cover_pages
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

