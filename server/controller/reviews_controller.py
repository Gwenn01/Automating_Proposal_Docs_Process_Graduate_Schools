from flask import request, json, jsonify
from model.general.get_proposal import (
    fetch_proposal_cover_page,
    fetch_proposal_content
)
from model.general.get_reviews import get_reviews
from controller.mapper.reviewer_get_docs_mapper import get_review_per_docs_mapper

def get_docs_with_review_controller():
    ...
    try:
        data = request.get_json()
        proposal_id = data.get('proposal_id')
        # get the cover content and review data
        proposal_cover = fetch_proposal_cover_page(proposal_id)
        proposal_content = fetch_proposal_content(proposal_id)
        proposal_review = get_reviews(proposal_id)
        # initialize only one data in the cover and content for duplicate data
        proposal_cover = proposal_cover[0]
        proposal_content = proposal_content[0]
        
        review_data = get_review_per_docs_mapper(proposal_cover, proposal_content, proposal_review)
    
        if not review_data:
            return jsonify({'message': 'No review data found'}), 404
        
        return jsonify(review_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
        
    