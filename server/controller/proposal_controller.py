from flask import request, jsonify
from model.implementor.insert_proposals import insert_proposal, insert_proposal_cover_page, insert_proposal_content
from middleware.proposal_validator import validate_proposal_data, validate_proposal_cover_page_data, validate_proposal_content_data

def save_proposal(data):
    # validation
    errors = validate_proposal_data(data)
    if errors:
        return jsonify({
            "message": "Validation failed",
            "errors": errors
        }), 400

    #  service call
    proposal_id = insert_proposal(data)

    return jsonify({
        "message": "Proposal saved successfully",
        "proposal_id": proposal_id
    }), 201
    
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