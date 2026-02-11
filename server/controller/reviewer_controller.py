from flask import jsonify, request
from model.reviewer.get_docs_for_reviewer import get_docs_for_reviewers
from model.reviewer.insert_reviewer_item import insert_review_item, updated_reviewed_count, update_is_reviewed
from model.reviewer.get_reviewer import get_reviewer_per_docs
from controller.mapper.reviewer_get_docs_mapper import get_docs_mapper
from model.reviewer.put_review_item import put_review_item
from model.reviewer.put_decision_review import put_decision_review
from model.general.insert_notification import insert_notification_db
from model.admin.get_admin import get_admin
from model.implementor.put_proposals import update_proposal_status_for_approval
from model.general.get_reviews import get_reviews

def get_docs_controller():
    try:
        data = request.get_json(force=True)  # force JSON parsing
        reviewer_id = data.get('reviewer_id')

        if not reviewer_id:
            return {"error": "reviewer_id is required"}, 400

        docs = get_docs_for_reviewers(reviewer_id)
        data_docs = [get_docs_mapper(d) for d in docs]

        return jsonify(data_docs), 200

    except Exception as e:
        return {"error": str(e)}, 500
   
    
def get_completed_docs_controller():
    ...
    try:
        ...
        data = request.get_json(force=True)  # force JSON parsing
        reviewer_id = data.get('reviewer_id')

        if not reviewer_id:
            return {"error": "reviewer_id is required"}, 400

        docs = get_docs_for_reviewers(reviewer_id)
        filter_docs = [doc for doc in docs if doc['status'] == 'approved']
        data_docs = [get_docs_mapper(d) for d in filter_docs]

        return jsonify(data_docs), 200
    except Exception as e:
        return {"error": str(e)}, 500
    


def get_pending_docs_controller():
    try:
        ...
        data = request.get_json(force=True)  # force JSON parsing
        reviewer_id = data.get('reviewer_id')

        if not reviewer_id:
            return {"error": "reviewer_id is required"}, 400

        docs = get_docs_for_reviewers(reviewer_id)
        filter_docs = [doc for doc in docs if doc['status'] == 'under_review']
        data_docs = [get_docs_mapper(d) for d in filter_docs]

        return jsonify(data_docs), 200
    except Exception as e:
        return {"error": str(e)}, 500


#handle insert data ============================================= 
def handle_insert_notification(user_id, message, reviewer_name):
    try:
        insert_notification_db(
            user_id,
            f"{message} {reviewer_name}"
        )
        return True
    except Exception as e:
        print(e)
        return False
    
    
def post_reviews_item_docs_controller():
    try:
        data = request.get_json(force=True)  
        review_id = data.get('review_id')
        proposal_id = data.get('proposal_id')
        reviewer_id = data.get('reviewer_id')
        reviewer_name = data.get('reviewer_name')
        user_id = data.get('user_id')
        if not data:
            return {"error": "review data are required"}, 400

        success = insert_review_item(review_id, data)
        is_updated = updated_reviewed_count(proposal_id)
        is_reviewed = update_is_reviewed(review_id)
        
        change_decision = put_decision_review(proposal_id, reviewer_id, 'need_revision')
        
        success_notif = handle_insert_notification(user_id, "Your proposal has been reviewed by", reviewer_name)
        if not success_notif:
            return {"error": "Failed to insert notification"}, 500
        
        if not success or not is_updated or not is_reviewed or not change_decision:
            return {"error": "Failed to insert review"}, 500

        return jsonify({"message": "Review inserted successfully"}), 200

    except Exception as e:
        return {"error": str(e)}, 500
    
def get_reviewer_per_docs_controller():
    try:
        data = request.get_json(force=True)  
        proposal_id = data.get('proposal_id')
        reviewer_id = data.get('user_id')
        
        if not data:
            return {"error": "review data are required"}, 400

        data = get_reviewer_per_docs(proposal_id, reviewer_id)
        if not data:
            return {"error": "Failed to get reviewer"}, 500

        return jsonify(data), 200

    except Exception as e:
        return {"error": str(e)}, 500
    
def update_review_items_controller():
    try:
        data = request.get_json(force=True)

        review_id = data.get("review_id")
        proposal_id = data.get("proposal_id")
        reviewer_name = data.get('reviewer_name')
        reviewer_id = data.get('reviewer_id')
        user_id = data.get('user_id')
        reviews = data.get("reviews")

        if not review_id or not proposal_id or not reviews:
            return {"error": "Invalid payload"}, 400

        success = put_review_item(review_id, reviews)

        success_notif = handle_insert_notification(user_id, "Your proposal has been reviewed by", reviewer_name)
        if not success_notif:
            return {"error": "Failed to insert notification"}, 500
        
        if not success:
            return {"error": "No rows updated. Check review_id/proposal_id"}, 404

        updated_reviewed_count(proposal_id)
        update_is_reviewed(review_id)

        return jsonify({"message": "Review updated successfully"}), 200

    except Exception as e:
        return {"error": str(e)}, 500
    
def handle_admin_notification(reviewer_name, title):
     admin_data = get_admin()
     
     for a in admin_data:
        success_notif = handle_insert_notification(
            a['user_id'],
            f'The proposal titled "{title}" has been approved by the reviewer.',
            reviewer_name
        )
        if not success_notif:
            return False

     return True  
    
def check_all_reviewer_approved(proposal_id):
    ...
    reviews = get_reviews(proposal_id)
    
    for r in reviews:
        if r['decision'] != "approved":
            return
    update_proposal_status_for_approval(proposal_id)

def approve_proposal_controller():
    try:
        ...
        data = request.get_json(force=True)

        proposal_id = data.get("proposal_id")
        user_id = data.get("user_id")
        reviewer_name = data.get("reviewer_name")
        title = data.get("title")
        
        if not proposal_id or not user_id:
            return {"error": "Invalid payload"}, 400

        success = put_decision_review(proposal_id, user_id, "approved")
        success_insert = handle_admin_notification(reviewer_name, title)

        check_all_reviewer_approved(proposal_id)
        
        if not success and not success_insert:
            return {"error": "No rows updated. Check proposal_id/user_id"}, 404

        return jsonify({"message": "Proposal approved successfully"}), 200
        
    except Exception as e:
        return {"error": str(e)}, 500