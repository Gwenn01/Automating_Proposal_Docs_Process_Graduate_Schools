from flask import request, jsonify

def assign_reviewer_validation(data):
    if not data:
        return False

    if "proposal_id" not in data:
        return False

    if "reviewers" not in data:
        return False