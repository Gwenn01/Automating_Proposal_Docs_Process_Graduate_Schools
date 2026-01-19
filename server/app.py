from flask import Flask
from flask_cors import CORS
from controller.test_run import run_tests_controller
from server.middleware.test_run import run_test_middleware

# -------------------------------------------------
# Flask Initialization
# -------------------------------------------------
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------------------------------------
# Register Blueprints
# -------------------------------------------------
from server.routes.health_routes import health_bp
# Database connection test -------------------------------------------------
from server.database.test_db_routes import test_db_bp
# authorization ------------------------------------------------------------
from routes.auth.registration_routes import registration_bp
from routes.auth.login_routes import login_bp
# admin --------------------------------------------------------------------
from routes.admin.manage_accounts_routes import manage_accounts_bp
from routes.admin.manage_docs_routes import manage_docs_bp
from routes.admin.assign_reviewer_routes import assign_bp
# reviewer -----------------------------------------------------------------
# general proposal-------------------------------------------------
from routes.general.upload_file_routes import upload_bp
from routes.general.get_proposal_routes import proposals_bp
from server.routes.implementor.create_proposal_routes import create_proposal_bp
# implementor

#---------------------------------------------------------------------------------
#---------------------------------------------------------------------------------
app.register_blueprint(health_bp, url_prefix="/api")
# Database connection test
app.register_blueprint(test_db_bp, url_prefix="/api")
# authorization
app.register_blueprint(registration_bp, url_prefix="/api")
app.register_blueprint(login_bp, url_prefix="/api")
# admin ---------------------------------------------------------------------
app.register_blueprint(manage_accounts_bp, url_prefix="/api")
app.register_blueprint(manage_docs_bp, url_prefix="/api")
app.register_blueprint(assign_bp, url_prefix="/api")
# reviewer-------------------------------------------------------------------
# general propsal-----------------------------------------------------------------
app.register_blueprint(upload_bp, url_prefix="/api")
app.register_blueprint(proposals_bp, url_prefix="/api")
app.register_blueprint(create_proposal_bp, url_prefix="/api")
# implementor
# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    run_tests_controller()
    run_test_middleware()
    app.run(debug=True)
