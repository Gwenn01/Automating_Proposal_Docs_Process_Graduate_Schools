from flask import Blueprint, request
from controller.login_controller import login_user

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    return login_user(data)

    