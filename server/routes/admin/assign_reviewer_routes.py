from flask import Blueprint, request, jsonify
from database.connection import get_db_connection

assign_bp = Blueprint("assign_reviewer", __name__)

@assign_bp.route("/assign-reviewer", methods=["POST"])
def assign_reviewer():
    data = request.json

    proposal_id = data.get("proposal_id")
    reviewer_id = data.get("reviewer_id")

    if not proposal_id or not reviewer_id:
        return jsonify({"message": "proposal_id and reviewer_id are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Check if reviewer exists and is reviewer
        cursor.execute("""
            SELECT user_id FROM users
            WHERE user_id = %s AND role = 'reviewer'
        """, (reviewer_id,))
        reviewer = cursor.fetchone()

        if not reviewer:
            return jsonify({"message": "Reviewer not found or invalid role"}), 404

        # Check if proposal exists
        cursor.execute("""
            SELECT proposal_id FROM proposals_docs
            WHERE proposal_id = %s
        """, (proposal_id,))
        proposal = cursor.fetchone()

        if not proposal:
            return jsonify({"message": "Proposal not found"}), 404

        # Prevent duplicate assignment
        cursor.execute("""
            SELECT assignment_id FROM proposal_assignments
            WHERE proposal_id = %s AND status = 'assigned'
        """, (proposal_id,))

        existing = cursor.fetchone()
        if existing:
            return jsonify({"message": "Proposal already assigned to a reviewer"}), 409

        # Insert assignment
        cursor.execute("""
            INSERT INTO proposal_assignments (proposal_id, reviewer_id)
            VALUES (%s, %s)
        """, (proposal_id, reviewer_id))

        # Update proposal status
        cursor.execute("""
            UPDATE proposals_docs
            SET status = 'under_review',
            reviewer_count = reviewer_count + 1
            WHERE proposal_id = %s
        """, (proposal_id,))

        conn.commit()

        return jsonify({
            "message": "Reviewer assigned successfully"
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@assign_bp.route("/reassign-reviewer", methods=["PUT"])
def reassign_reviewer():
    data = request.json

    proposal_id = data.get("proposal_id")
    new_reviewer_id = data.get("reviewer_id")

    if not proposal_id or not new_reviewer_id:
        return jsonify({"message": "proposal_id and reviewer_id are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Mark old assignment as reassigned
        cursor.execute("""
            UPDATE proposal_assignments
            SET status = 'reassigned'
            WHERE proposal_id = %s AND status = 'assigned'
        """, (proposal_id,))

        # Assign new reviewer
        cursor.execute("""
            INSERT INTO proposal_assignments (proposal_id, reviewer_id)
            VALUES (%s, %s)
        """, (proposal_id, new_reviewer_id))

        conn.commit()

        return jsonify({
            "message": "Reviewer reassigned successfully"
        }), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()
