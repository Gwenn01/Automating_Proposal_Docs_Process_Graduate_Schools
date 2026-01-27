from flask import Blueprint, request
from controller.reviewer_controller import get_docs_controller
from controller.reviewer_controller import put_reviews_item_docs_controller

reviewer_db = Blueprint('reviewer', __name__)

@reviewer_db.route('/get-docs-for-reviewer', methods=['POST'])
def get_docs():
    return get_docs_controller()

@reviewer_db.route('/post-reviews-item', methods=['POST'])
def put_reviews_docs():
    return put_reviews_item_docs_controller()