from flask import request, jsonify
from flask import request, jsonify
from model.general.get_history import (
    get_history_cover_page_db,
    get_history_content_db,
    get_history_reviews_db
)
from model.general.get_proposal import (
    fetch_proposal_cover_page,
    fetch_proposal_content
)
from model.general.get_reviews import get_reviews,  get_review_base_proposal_user_id
from controller.mapper.reviewer_get_docs_mapper import get_review_per_docs_mapper

def get_data_controller():
    try:
        ...
        data = request.get_json()
        history_id = data.get('history_id')
        reviewer_id = data.get('reviewer_id')
        status = data.get('status')
        
        if not history_id and status:
            return jsonify({'error': 'history_id and status is required'}), 400
        #get the data of history
        if status == 'history':
            cover_history = get_history_cover_page_db(history_id)
            if not cover_history:
                return jsonify({'error': 'cover history not found'}), 404
            content_history = get_history_content_db(history_id)
            if not content_history:
                return jsonify({'error': 'content history not found'}), 404
            review_history = get_history_reviews_db(history_id)
            if not review_history:
                return jsonify({'error': 'reviews history not found'}), 404
        # format the data
            result = get_review_per_docs_mapper(cover_history[0], content_history[0], review_history)
            result['status'] = status
            return jsonify(result), 200
        else:
            proposal_id = history_id
            proposal_cover = fetch_proposal_cover_page(proposal_id)
            if not proposal_cover:
                return jsonify({'error': 'cover not found'}), 404
            proposal_content = fetch_proposal_content(proposal_id)
            if not proposal_content:
                return jsonify({'error': 'content not found'}), 404
            # if the proposal is current return the reviews by user only
            #proposal_review = get_reviews(proposal_id)
            proposal_review = get_review_base_proposal_user_id(proposal_id, reviewer_id)
            data = []
            data.append(proposal_review)
            if not proposal_review:
                return jsonify({'error': 'reviews not found'}), 404
            result = get_review_per_docs_mapper(proposal_cover[0], proposal_content[0], data)
            result['status'] = status
            # passed the is reviewed 
            result['is_reviewed'] = proposal_review['is_reviewed']
            return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500