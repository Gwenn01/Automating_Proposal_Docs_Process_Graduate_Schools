from flask import request, json, jsonify
from model.general.get_proposal import (
    fetch_proposal_cover_page,
    fetch_proposal_content
)
from model.general.get_reviews import get_reviews

def get_docs_with_review_controller():
    ...
    try:
        data = request.get_json()
        proposal_id = data.get('proposal_id')
    
        proposal_docs = {}
        
        proposal_docs["cover"] = fetch_proposal_cover_page(proposal_id)
        proposal_docs["content"] = fetch_proposal_content(proposal_id)
        
        proposal_reviews = get_reviews(proposal_id)
        
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
        
    