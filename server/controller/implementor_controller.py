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
    fetch_proposal_title
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

from model.implementor.put_proposals import (
    update_proposal_cover_page_db,
    update_proposal_content_db,
    update_reviews,
    update_review_item,
    handle_update_status_db,
    update_is_reviewed,
)
from middleware.proposal_validator import validate_proposal_data, validate_proposal_cover_page_data, validate_proposal_content_data
from model.implementor.handle_check_edit_proposal import handle_check_edit_proposal
from model.implementor.put_proposal_deadline import put_proposal_deadline_db
from model.general.insert_notification import insert_notification_db
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
    # print(data)
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
    #print(data)
    # service call
    insert_proposal_content(proposal_id, data)

    return jsonify({
        "message": "Proposal content updated successfully"
    }), 200
    
# FOR REVISION PROPOSAL CONTROLLER ONLY ==================================================================================================
def handle_insert_notification(user_id, title):
    try:
        insert_notification_db(
            user_id,
            f'The proposal "{title["title"]}" has been revised. Please review the updated version.'
        )
        return True
    except Exception as e:
        print(e)
        return False
    
def handle_insertion_history(proposal_id, user_id):
    try:
       #get the version
        version_no = put_version_count(proposal_id)
        if not version_no:
            return False, "Failed to generate version number"
        #insert the proposal history
        history_id = insert_proposal_history(proposal_id, user_id, version_no)
        if not history_id:
            return False, "Failed to insert proposal history"
        # get the title of proposal to put in notification
        title = fetch_proposal_title(proposal_id)[0]
        # get the current data from the backend before updating
        proposal_cover_data = fetch_proposal_cover_page(proposal_id)
        proposal_content_data = fetch_proposal_content(proposal_id)
        if not proposal_cover_data or not proposal_content_data:
            return False, "Failed to fetch proposal data"
        # insert the cover and content data
        success_cover = insert_cover_page_history(history_id, proposal_cover_data[0])
        success_content= insert_proposal_content_history(history_id, proposal_content_data[0])
        if not success_cover or not success_content:
            return False, "Failed to insert history content"

        #insert the review data
        reviewer_id = get_reviewer_id(proposal_id)
        
        for reviewer in reviewer_id:
            #inserting history for the reviewer
            review_history_id = insert_review_history(history_id, reviewer["user_id"], version_no)
            #get the current review data
            review_item = get_review_base_proposal_user_id(proposal_id, reviewer["user_id"])
            # put the proposal deadline
            put_proposal_deadline_db(proposal_id, reviewer["user_id"])
            # put notification to reviewer after the implementor revise the docs
            handle_insert_notification(reviewer["user_id"], title)
            if review_item:
                #insert review
                insert_review_items_history(review_history_id, review_item)
                
        return True, "Insert History Successfully"

    except Exception as e:
        print(e)
        return False, "Failed to insert history"
    
    
    
def handle_updating_proposals(proposal_id, cover_id, content_id, data):
    try:
        ...
        success_cover = update_proposal_cover_page_db(cover_id, proposal_id, data["cover"])
        if not success_cover:
            return False, "Cover page not updated"
                
        success_content = update_proposal_content_db(content_id, proposal_id, data["content"])
        if not success_content:
            return True, "Content page not updated"
        
        return True, "Proposal updated successfully"
    except Exception as e:
        print(e)
        return False, "Failed to update proposal"
    
    
def handle_clean_reviews(proposal_id):
    try:
     #clean the reviewed 
        #get the reviewer id so that we can clean the review item
        review_id = update_reviews(proposal_id)
        for r in review_id:
            update_is_reviewed(r)
            update_review_item(r)
        return True, "Updated Successfully"
    except Exception as e:
        print(e)
        return False, "Failed to clean the reviews"
    
    
def handle_update_status(proposal_id):
    try:
        is_update_status = handle_update_status_db(proposal_id)
        if not is_update_status:
            return False, "Proposal status not updated"
        return True, "Updated successfully"
    except  Exception as e:
        print(e)
        return False, None, "Failed to update the proposal status"
    
def revise_proposals_controller():
    try:
        ...
        # get the dat from frontend
        data = request.get_json(force=True)
        proposal_id = data.get("proposal_id")
        user_id = data.get("user_id")
        content_id = data.get("content_id")
        cover_id = data.get("cover_id")

        # Step 1: Insert history
        success, error = handle_insertion_history(proposal_id, user_id)
        if not success:
            return jsonify({"error": error}), 500
        else:
            print("History inserted successfully")
        
         # Step 2: Update proposal
        success, error = handle_updating_proposals(
            proposal_id, cover_id, content_id, data
        )
        if not success:
            return jsonify({"error": error}), 500
        else:
            print("Proposal updated successfully")
        
        # Step 3: Clean reviews
        success, error = handle_clean_reviews(proposal_id)
        if not success:
            return jsonify({"error": error}), 500
        else:
            print("Reviews cleaned successfully")

        # Step 4: Update status
        success, error = handle_update_status(proposal_id)
        if not success:
            return jsonify({"error": error}), 500
        else:
            print("Status updated successfully")

        return jsonify({"message": "Proposal revised successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
  #check if its okay to update ==================================================================================================================  
def check_edit_proposal_controller():
    try:
        data = request.get_json(force=True)
        proposal_id = data.get("proposal_id")
        user_id = data.get("user_id")
        proposal = handle_check_edit_proposal(proposal_id, user_id)[0]
        if proposal['reviewed_count'] >= proposal['reviewer_count']:
            return jsonify({"message": "Proposal can be edited", "status": True}), 200
        else:
            return jsonify({"message": "Proposal cannot be edited", "status": False}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500