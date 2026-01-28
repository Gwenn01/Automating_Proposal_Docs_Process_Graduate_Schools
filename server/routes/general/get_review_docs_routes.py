from flask import Blueprint
from controller.reviews_controller import (
    get_docs_with_review_controller
)

reviews_bp = Blueprint('reviews_db', __name__)

@reviews_bp.route('/get-reviews-per-docs', methods=["POST"])
def get_review_docs():
    return get_docs_with_review_controller()