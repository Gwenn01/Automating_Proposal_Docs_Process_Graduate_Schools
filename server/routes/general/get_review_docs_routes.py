from flask import Blueprint
from controller.reviews_controller import (
    get_docs_with_review_controller
)
from controller.reviews_controller import (
    get_assigned_reviewers_controller
)

reviews_bp = Blueprint('reviews_db', __name__)

@reviews_bp.route('/get-assigned-reviewers', methods=["POST"])
def get_assigned_reviewers():
    return get_assigned_reviewers_controller()

@reviews_bp.route('/get-reviews-per-docs', methods=["POST"])
def get_review_docs():
    return get_docs_with_review_controller()