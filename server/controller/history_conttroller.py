from flask import request, jsonify
from model.general.get_history import get_history_db

def format_hostory(history):
    try:
        history_sorted = sorted(
            history,
            key=lambda x: x['changed_at'],
            reverse=True
        )

        data = []
        for h in history_sorted:
            data.append({
                'proposal_id': h['proposal_id'],
                'history_id': h['history_id'],
                'status': h['source'],
                'version_no': h['edit_version_count'],
                'created_at': h['changed_at'],
            })

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