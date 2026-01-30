from flask import request, jsonify
from model.implementor.insert_proposals import (
    insert_proposal, 
    insert_proposal_cover_page, 
    insert_proposal_content
)
from model.implementor.insert_history import (
    insert_proposal_history, 
    insert_cover_page_history,
    insert_proposal_content_history
)
from model.general.get_proposal import (
    fetch_proposal_cover_page,
    fetch_proposal_content,
)
from model.general.get_reviews import (
    get_reviews,
    get_review_base_proposal_user_id
)
from model.reviewer.insert_review_history import (
    insert_review_history,
    insert_review_items_history
)
from model.reviewer.get_reviewer import get_reviewer_id
from model.implementor.put_version_count import put_version_count
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
    
    
def revise_proposals_controller(data):
    try:
        ...
        # get the dat from frontend
        #data = request.get_json(force=True)
        proposal_id = data.get("proposal_id")
        user_id = data.get("user_id")
        #get the version
        version_no = put_version_count(proposal_id)
        #insert the proposal history
        history_id = insert_proposal_history(proposal_id, user_id, version_no)
        # get the current data from the backend before updating
        proposal_cover_data = fetch_proposal_cover_page(proposal_id)
        proposal_content_data = fetch_proposal_content(proposal_id)
        # insert the cover and content data
        success_cover = insert_cover_page_history(history_id, proposal_cover_data[0])
        success_content= insert_proposal_content_history(history_id, proposal_content_data[0])
        
        # if not success_cover and not success_content:
        #     return jsonify({
        #         "message": "Proposal insert history failed"
        #     }), 500
        # insert the review data
        reviewer_id = get_reviewer_id(proposal_id)
        for reviewer in reviewer_id:
            review_history_id = insert_review_history(history_id, reviewer["user_id"], version_no)
            review_item = get_review_base_proposal_user_id(proposal_id, reviewer["user_id"])
            if review_item:
                insert_review_items_history(review_history_id, review_item)
        
            
        
    except Exception as e:
        # return jsonify({"error": str(e)}), 500
        return "error"