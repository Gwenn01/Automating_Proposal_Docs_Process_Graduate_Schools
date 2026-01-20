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
# reviewer -----------------------------------------------------------------
# general proposal-------------------------------------------------
from routes.general.get_proposal_routes import proposals_bp
from routes.implementor.create_proposal_routes import create_proposal_bp
# implementor

#---------------------------------------------------------------------------------
#---------------------------------------------------------------------------------
app.register_blueprint(health_bp, url_prefix="/api")
# Database connection test
app.register_blueprint(test_db_bp, url_prefix="/api")
# authorization
app.register_blueprint(registration_bp, url_prefix="/api")
app.register_blueprint(login_bp, url_prefix="/api")
# admin -------------------------------------------------------------------------------------------
# general proposal-----------------------------------------------------------------
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
