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
from model.general.get_reviews import get_reviews
from controller.mapper.reviewer_get_docs_mapper import get_review_per_docs_mapper

def get_data_controller():
    try:
        ...
        data = request.get_json()
        history_id = data.get('history_id')
        status = data.get('status')
        
        if not history_id and status:
            return jsonify({'error': 'history_id and status is required'}), 400
        #get the data of history
        if status == 'history':
            cover_history = get_history_cover_page_db(history_id)
            if not cover_history:
                return jsonify({'error': 'history not found'}), 404
            content_history = get_history_content_db(history_id)
            if not content_history:
                return jsonify({'error': 'history not found'}), 404
            review_history = get_history_reviews_db(history_id)
            if not review_history:
                return jsonify({'error': 'history not found'}), 404
        # format the data
            result = get_review_per_docs_mapper(cover_history[0], content_history[0], review_history)
            result['status'] = status
            return jsonify(result), 200
        else:
            proposal_id = history_id
            proposal_cover = fetch_proposal_cover_page(proposal_id)
            if not proposal_cover:
                return jsonify({'error': 'proposal not found'}), 404
            proposal_content = fetch_proposal_content(proposal_id)
            if not proposal_content:
                return jsonify({'error': 'proposal not found'}), 404
            proposal_review = get_reviews(proposal_id)
            if not proposal_review:
                return jsonify({'error': 'proposal not found'}), 404
            result = get_review_per_docs_mapper(proposal_cover[0], proposal_content[0], proposal_review)
            result['status'] = status
            return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500