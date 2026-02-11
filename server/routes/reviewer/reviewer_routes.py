from flask import Blueprint, request
from controller.reviewer_controller import (
    get_docs_controller,
    get_completed_docs_controller,
    get_pending_docs_controller,
    post_reviews_item_docs_controller,
    get_reviewer_per_docs_controller,
    update_review_items_controller,
    approve_proposal_controller
)

reviewer_db = Blueprint('reviewer', __name__)

@reviewer_db.route('/get-docs-for-reviewer', methods=['POST'])
def get_docs():
    return get_docs_controller()

@reviewer_db.route('/get-completed-docs-for-reviewer', methods=['POST'])
def get_completed_docs():
    return get_completed_docs_controller()

@reviewer_db.route('/get-pending-docs-for-reviewer', methods=['POST'])
def get_pending_docs():
    return get_pending_docs_controller()


@reviewer_db.route('/post-reviews-item', methods=['POST'])
def post_review_item():
    return post_reviews_item_docs_controller()

@reviewer_db.route('/get-reviewer-per-docs', methods=['POST'])
def get_reviewer_per_docs():
   return get_reviewer_per_docs_controller()

@reviewer_db.route('/update-review-items', methods=['POST'])
def update_review_items():
    # {
    #     "proposal_id": 1,
    #     "review_id": 48,
    #     "reviews": {
    #         "review_round": "2nd",
    #         "proposal_type": "Project",
    #         "source_of_fund": "Resolution No. 1436, S. 2025",
    #         "cover_letter_feedback": "",
    #         "form1_proposal_feedback": "",
    #         "project_profile_feedback": "",
    #         "rationale_feedback": "",
    #         "significance_feedback": "",
    #         "general_objectives_feedback": "",
    #         "specific_objectives_feedback": "",
    #         "methodology_feedback": "",
    #         "expected_output_feedback": "",
    #         "potential_impact_feedback": "",
    #         "sustainability_plan_feedback": "",
    #         "org_staffing_feedback": "",
    #         "work_financial_plan_feedback": "",
    #         "budget_summary_feedback": ""
    #     }
    # }
    return update_review_items_controller()

@reviewer_db.route('/approve-proposal', methods=['POST'])
def approve_proposal():
    # {
    #     "proposal_id": 1,
    #     "user_id": 1,
    #     "decision": "approved"
    # }
    return approve_proposal_controller()
