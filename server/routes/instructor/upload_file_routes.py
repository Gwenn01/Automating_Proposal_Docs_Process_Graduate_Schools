import os
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from database.connection import get_db_connection

upload_bp = Blueprint('upload', __name__)

UPLOAD_FOLDER = "uploads/proposals"
ALLOWED_EXTENSIONS = {"pdf", "doc", "docx"}

# Check allowed file type
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@upload_bp.route("/upload-proposal", methods=["POST"])
def upload_proposal():
    # Required form fields
    user_id = request.form.get("user_id")
    title = request.form.get("title")
    file = request.files.get("file")

    if not user_id or not title or not file:
        return jsonify({"message": "Missing required fields"}), 400

    if not allowed_file(file.filename):
        return jsonify({"message": "Invalid file type"}), 400

    # Secure filename
    filename = secure_filename(file.filename)

    # Ensure upload folder exists
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Save to database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO proposals_docs (user_id, title, file_path)
            VALUES (%s, %s, %s)
        """, (user_id, title, file_path))

        conn.commit()

        return jsonify({
            "message": "Proposal uploaded successfully",
            "file_path": file_path
        }), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@upload_bp.route("/view-proposal/<filename>", methods=["GET"])
def view_proposal(filename):
    return send_from_directory("uploads/proposals", filename)
