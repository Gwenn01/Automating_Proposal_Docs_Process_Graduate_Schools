from flask import Blueprint, request
from controller.admin_controller import (
    get_all_documents_with_user_controller,
    get_all_reviewers_controller,
    assign_reviewer_controller
)

assign_reviewer_bp = Blueprint('assign_reviewer_bp', __name__)

@assign_reviewer_bp.route('/get-docs-user', methods=['GET'])
def get_all_docs_with_user():
    return get_all_documents_with_user_controller()

@assign_reviewer_bp.route('/get-all-reviewer', methods=['POST'])
def get_all_reviewer():
    return get_all_reviewers_controller()

@assign_reviewer_bp.route('/assign-reviewer', methods=['POST'])
def assign_reviewer():
    #sample data
    # {
    #     "proposal_id": 1,
    #     "reviewers": [
    #             { "reviewer_id": 1 },
    #             { "reviewer_id": 2 }
    #         ]
    # }
    return assign_reviewer_controller()
