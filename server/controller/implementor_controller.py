from flask import request, jsonify
from model.implementor.insert_proposals import insert_proposal, insert_proposal_cover_page, insert_proposal_content
from middleware.proposal_validator import validate_proposal_data, validate_proposal_cover_page_data, validate_proposal_content_data

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