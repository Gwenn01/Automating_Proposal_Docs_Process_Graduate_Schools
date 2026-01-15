from flask import Blueprint, jsonify, request
from database.connection import get_db_connection
import os

manage_docs_bp = Blueprint("manage_docs", __name__)
# get all docs
@manage_docs_bp.route("/manage-docs/view", methods=["GET"])
def get_all_documents():
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

                u.user_id,
                u.fullname,
                u.email,
                u.role
            FROM proposals_docs p
            JOIN users u ON p.user_id = u.user_id
            ORDER BY p.submission_date DESC
        """)

        documents = cursor.fetchall()

        return jsonify({
            "documents": documents
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@manage_docs_bp.route("/manage-docs/edit-title/<int:proposal_id>", methods=["PUT"])
def update_proposal_title(proposal_id):
    data = request.json
    new_title = data.get("title")

    if not new_title or not new_title.strip():
        return jsonify({"message": "Title is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE proposals_docs
            SET title = %s
            WHERE proposal_id = %s
        """, (new_title.strip(), proposal_id))

        if cursor.rowcount == 0:
            return jsonify({"message": "Proposal not found"}), 404

        conn.commit()

        return jsonify({
            "message": "Title updated successfully"
        }), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@manage_docs_bp.route("/manage-docs/delete/<int:proposal_id>", methods=["DELETE"])
def delete_document(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Check if document exists and not deleted
        cursor.execute("""
            SELECT proposal_id
            FROM proposals_docs
            WHERE proposal_id = %s AND is_deleted = 0
        """, (proposal_id,))

        proposal = cursor.fetchone()

        if not proposal:
            return jsonify({"message": "Document not found or already deleted"}), 404

        # Soft delete document
        cursor.execute("""
            UPDATE proposals_docs
            SET is_deleted = 1,
                deleted_at = NOW()
            WHERE proposal_id = %s
        """, (proposal_id,))

        conn.commit()

        return jsonify({
            "message": "Document deleted successfully (soft delete)"
        }), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()