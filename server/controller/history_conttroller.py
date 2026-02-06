from flask import request, jsonify
from model.general.get_history import (
    get_history_db,
    get_history_cover_page_db,
    get_history_content_db,
    get_history_reviews_db
)
from controller.mapper.reviewer_get_docs_mapper import get_review_per_docs_mapper

def format_hostory(history):
    try:
        history_sorted = sorted(
            history,
            key=lambda x: x['changed_at'],
            reverse=True
        )

        data = []
        for h in history_sorted:
            if h["history_id"] is None:
                h['history_id'] = h['proposal_id']
            data.append({
                'proposal_id': h['proposal_id'],
                'history_id': h['history_id'],
                'status': h['source'],
                'version_no': h['edit_version_count'],
                'created_at': h['changed_at'],
            })
            
        data.sort(key=lambda x: x["version_no"], reverse=True)
        data.sort(
            key=lambda x: (x["status"] == "current", x["created_at"]),
            reverse=False
        )

        return data

    except Exception as e:
        print(e)
        return None


def get_history_controller():
    ...
    try:
        ...
        data = request.get_json()
        proposal_id = data.get('proposal_id')
        
        if not proposal_id:
            return jsonify({'error': 'proposal_id is required'}), 400
        
        history = get_history_db(proposal_id)
        return jsonify(format_hostory(history)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

def get_history_data_controller():
    ...
    try:
        ...
        data = request.get_json()
        history_id = data.get('history_id')
        
        if not history_id:
            return jsonify({'error': 'history_id is required'}), 400
        #get the data of history
        cover_history = get_history_cover_page_db(history_id)[0]
        content_history = get_history_content_db(history_id)[0]
        review_history = get_history_reviews_db(history_id)
        # format the data
        result = get_review_per_docs_mapper(cover_history, content_history, review_history)
        if not result:
            return jsonify({'error': 'No data found'}), 404

        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

