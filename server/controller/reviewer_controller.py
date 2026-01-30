from flask import jsonify, request
from model.reviewer.get_docs_for_reviewer import get_docs_for_reviewers
from model.reviewer.insert_reviewer_item import insert_review_item, updated_reviewed_count, update_is_reviewed
from model.reviewer.get_reviewer import get_reviewer_per_docs
from controller.mapper.reviewer_get_docs_mapper import get_docs_mapper

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

def put_reviews_item_docs_controller():
    try:
        data = request.get_json(force=True)  
        review_id = data.get('review_id')
        proposal_id = data.get('proposal_id')
        if not data:
            return {"error": "review data are required"}, 400

        success = insert_review_item(review_id, data)
        is_updated = updated_reviewed_count(proposal_id)
        is_reviewed = update_is_reviewed(review_id)
        if not success or not is_updated or not is_reviewed:
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