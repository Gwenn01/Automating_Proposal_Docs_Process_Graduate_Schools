from flask import Blueprint, request
from controller.reviewer_controller import (
    get_docs_controller,
    put_reviews_item_docs_controller,
    get_reviewer_per_docs_controller
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