from flask import Blueprint
from controller.admin_controller import (
    get_all_users_controller
)

manage_accounts_bp = Blueprint('manage_accounts', __name__)

@manage_accounts_bp.route('/get-all-accounts')
def manage_accounts():
    return get_all_users_controller()