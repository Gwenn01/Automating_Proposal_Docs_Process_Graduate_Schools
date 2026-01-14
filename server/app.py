from flask import Flask
from flask_cors import CORS

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
from routes.test_db_routes import test_db_bp
# authorization ------------------------------------------------------------
from routes.auth.registration_routes import registration_bp
from routes.auth.login_routes import login_bp
# admin --------------------------------------------------------------------
from routes.admin.manage_accounts_routes import manage_accounts_bp
from routes.admin.manage_docs_routes import manage_docs_bp
# reviewer -----------------------------------------------------------------
from routes.reviewer.get_docs_reviewer_routes import get_docs_reviewer_bp
# instructor-------------------------------------------------
from routes.instructor.upload_file_routes import upload_bp
from routes.instructor.get_proposal_routes import proposals_bp
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
# reviewer-------------------------------------------------------------------
app.register_blueprint(get_docs_reviewer_bp, url_prefix="/api")
# instructor-----------------------------------------------------------------
app.register_blueprint(upload_bp, url_prefix="/api")
app.register_blueprint(proposals_bp, url_prefix="/api")

# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
