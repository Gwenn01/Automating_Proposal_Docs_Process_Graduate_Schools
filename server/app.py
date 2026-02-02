from flask import Flask
from flask_cors import CORS
from controller.test_run import run_tests_controller
from middleware.test_run import run_test_middleware

# -------------------------------------------------
# Flask Initialization
# -------------------------------------------------
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------------------------------------
# Register Blueprints
# -------------------------------------------------
from routes.health_routes import health_bp
# Database connection test -------------------------------------------------
from database.test_db_routes import test_db_bp
# authorization ------------------------------------------------------------
from routes.auth.registration_routes import registration_bp
from routes.auth.login_routes import login_bp
# admin --------------------------------------------------------------------
from routes.admin.get_overview import admin_overview_bp
from routes.admin.assign_reviewer import assign_reviewer_bp
from routes.admin.manage_accounts import manage_accounts_bp
from routes.admin.manage_docs import manage_docs_bp
# implementor --------------------------------------------------------------
from routes.implementor.create_proposal_routes import create_proposal_bp
from routes.implementor.implementor_routes import implementor_bp
# reviewer -----------------------------------------------------------------
from routes.reviewer.reviewer_routes import reviewer_db
# general proposal-------------------------------------------------
from routes.general.get_proposal_routes import proposals_bp
from routes.general.get_review_docs_routes import reviews_bp
# implementor
#history
from routes.general.get_history_routes import history_bp
#---------------------------------------------------------------------------------
#---------------------------------------------------------------------------------
app.register_blueprint(health_bp, url_prefix="/api")
# Database connection test
app.register_blueprint(test_db_bp, url_prefix="/api")
# authorization
app.register_blueprint(registration_bp, url_prefix="/api")
app.register_blueprint(login_bp, url_prefix="/api")
# admin --------------------------------------------------------------------------------
app.register_blueprint(admin_overview_bp, url_prefix="/api")
app.register_blueprint(assign_reviewer_bp, url_prefix="/api")
app.register_blueprint(manage_accounts_bp, url_prefix="/api")
app.register_blueprint(manage_docs_bp, url_prefix="/api")
# implementor ------------------------------------------------------------------------
app.register_blueprint(create_proposal_bp, url_prefix="/api")
app.register_blueprint(implementor_bp, url_prefix="/api")
# reviewer --------------------------------------------------------------------------------
app.register_blueprint(reviewer_db, url_prefix="/api")
# general proposal-----------------------------------------------------------------
app.register_blueprint(proposals_bp, url_prefix="/api")
app.register_blueprint(reviews_bp, url_prefix="/api")
# implementor
#history
app.register_blueprint(history_bp, url_prefix="/api")
# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    run_tests_controller()
    run_test_middleware()
    app.run(debug=True)
