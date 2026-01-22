from flask import request, jsonify

def assign_reviewer_validation(data):
    if not data or not isinstance(data, dict):
        return False

    # proposal_id validation
    if "proposal_id" not in data or not isinstance(data["proposal_id"], int):
        return False

    # reviewers validation
    if "reviewers" not in data or not isinstance(data["reviewers"], list):
        return False

    if len(data["reviewers"]) == 0:
        return False

    for reviewer in data["reviewers"]:
        if not isinstance(reviewer, dict):
            return False
        if "reviewer_id" not in reviewer:
            return False
        if not isinstance(reviewer["reviewer_id"], int):
            return False

    return True
