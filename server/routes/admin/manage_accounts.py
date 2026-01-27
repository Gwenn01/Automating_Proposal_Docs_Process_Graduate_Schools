from flask import Blueprint
from controller.admin_controller import (
    get_all_users_controller,
    create_account_controller,
    edit_account_controller,
    delete_account_controller
)

manage_accounts_bp = Blueprint('manage_accounts', __name__)

@manage_accounts_bp.route('/get-all-accounts')
def manage_accounts():
    return get_all_users_controller()

@manage_accounts_bp.route('/create-account', methods=['POST'])
def create_account():
    # {
    # "fullname": "Christian Pantillon",
    # "email": "istchirstian@gmail.com",
    # "password": "christian123",
    # "role": "reviewer"
    # }
    return create_account_controller()

@manage_accounts_bp.route('/update-account', methods=['PUT'])
def update_account():
#     {
#     "user_id": 9,
#     "fullname": "Christian Pantillonn",
#     "email": "istchirstian@gmail.com",
#     "password": "christian123",
#     "role": "reviewer"
#    }
    return edit_account_controller()

@manage_accounts_bp.route('/delete-account', methods=['DELETE'])
def delete_account():
    # {
    # "user_id": 9,
    # }
    return delete_account_controller()