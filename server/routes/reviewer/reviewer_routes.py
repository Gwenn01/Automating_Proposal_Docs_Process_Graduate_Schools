from flask import Blueprint, request
from controller.reviewer_controller import (
    get_docs_controller,
    put_reviews_item_docs_controller,
    get_reviewer_per_docs_controller,
    update_review_items_controller
)

reviewer_db = Blueprint('reviewer', __name__)

@reviewer_db.route('/get-docs-for-reviewer', methods=['POST'])
def get_docs():
    return get_docs_controller()

@reviewer_db.route('/post-reviews-item', methods=['POST'])
def post_review_item():
    return put_reviews_item_docs_controller()

@reviewer_db.route('/get-reviewer-per-docs', methods=['POST'])
def get_reviewer_per_docs():
   return get_reviewer_per_docs_controller()

@reviewer_db.route('/update-review-items', methods=['POST'])
def update_review_items():
    {
        "review_id": 1,
        "reviews": {
            "review_round": "2nd",
            "proposal_type": "Project",
            "source_of_fund": "Resolution No. 1436, S. 2025",
            "cover_letter_feedback": "",
            "form1_proposal_feedback": "",
            "project_profile_feedback": "",
            "rationale_feedback": "",
            "significance_feedback": "",
            "general_objectives_feedback": "",
            "specific_objectives_feedback": "",
            "methodology_feedback": "",
            "expected_output_feedback": "",
            "potential_impact_feedback": "",
            "sustainability_plan_feedback": "",
            "org_staffing_feedback": "",
            "work_financial_plan_feedback": "",
            "budget_summary_feedback": ""
        }
    }
    return update_review_items_controller()
