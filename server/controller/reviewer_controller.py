from flask import jsonify, request
from model.reviewer.get_docs_for_reviewer import get_docs_for_reviewers
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

    