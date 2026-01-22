from flask import Blueprint, request
from controller.reviewer_controller import get_docs_controller

get_docs_db = Blueprint('get_docs', __name__)

@get_docs_db.route('/get-docs-for-reviewer', methods=['POST'])
def get_docs():
    return get_docs_controller()