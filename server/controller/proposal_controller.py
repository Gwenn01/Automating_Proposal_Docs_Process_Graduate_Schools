from flask import request, jsonify
from model.implementor.insert_proposals import insert_proposal, insert_proposal_cover_page, insert_proposal_content
from middleware.proposal_validator import validate_proposal_data, validate_proposal_cover_page_data, validate_proposal_content_data
from model.general.get_proposal import (
    fetch_user_proposals,
    fetch_proposal_cover_page,
    fetch_proposal_content
)
from controller.mapper.proposal_mapper import (
    implementor_view_proposal_mapper,
    view_cover_page_format_mapper,
    view_cover_page_structured_mapper,
    view_content_mapper
)
    

# creating or inserting proposal into database
def save_proposal():
    data = request.get_json()

    try:
        errors = validate_proposal_data(data)
        if errors:
            return jsonify({
                "message": "Validation failed",
                "errors": errors
            }), 400
        proposal_id = insert_proposal(data)
        return jsonify({
            "message": "Proposal created successfully",
            "proposal_id": proposal_id,
            "next_steps": {
                "cover_page": f"/api/proposals/cover/{proposal_id}",
                "content": f"/api/proposals/content/{proposal_id}"
            }
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
def update_proposal_cover_page(proposal_id, data):
    # validation
    errors = validate_proposal_cover_page_data(data)
    if errors:
        return jsonify({
            "message": "Validation failed",
            "errors": errors
        }), 400

    # service call
    insert_proposal_cover_page(proposal_id, data)

    return jsonify({
        "message": "Proposal cover page updated successfully"
    }), 200

def update_proposal_content(proposal_id, data):
    # validation
    errors = validate_proposal_content_data(data)
    if errors:
        return jsonify({
            "message": "Validation failed",
            "errors": errors
        }), 400

    # service call
    insert_proposal_content(proposal_id, data)

    return jsonify({
        "message": "Proposal content updated successfully"
    }), 200

# fetching proposals into database
def get_user_proposals_controller(user_id):
    try:
        proposals = implementor_view_proposal_mapper(fetch_user_proposals(user_id))
        return jsonify({"proposals": proposals}), 200
    except Exception:
        return jsonify({"message": "Failed to fetch proposals"}), 500


def get_user_coverpage_proposal_controller(proposal_id):
    try:
        cover_page = view_cover_page_structured_mapper(fetch_proposal_cover_page(proposal_id))
        return jsonify({"cover_pages": cover_page}), 200
    except Exception:
        return jsonify({"message": "Failed to fetch cover page"}), 500


def get_user_content_proposal_controller(proposal_id):
    try:
        content_page = view_content_mapper(fetch_proposal_content(proposal_id))
        return jsonify({"content_pages": content_page}), 200
    except Exception:
        return jsonify({"message": "Failed to fetch content page"}), 500