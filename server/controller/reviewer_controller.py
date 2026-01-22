from flask import jsonify, request
from model.reviewer.get_docs_for_reviewer import get_docs_for_reviewer
from controller.mapper import reviewer_get_docs_mapper


def get_docs_controller():
    ...
    try:
        data = request.get_json()
        reviewer_id = data['reviewer_id']
        data_docs = []
        docs = get_docs_for_reviewer(reviewer_id)
        for d in docs:
            data_docs.append(reviewer_get_docs_mapper(d))
        return jsonify(data_docs), 200
    except Exception as e:
        return {"error": str(e)}
    