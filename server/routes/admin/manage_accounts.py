from flask import Blueprint

manage_accounts_bp = Blueprint('manage_accounts', __name__)

@manage_accounts_bp.route('/admin/manage_accounts')
def manage_accounts():
    return 'Manage Accounts Page'