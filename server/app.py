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
from routes.test_db_routes import test_db_bp

app.register_blueprint(health_bp, url_prefix="/api")
app.register_blueprint(test_db_bp, url_prefix="/api")
# -------------------------------------------------
# Entry Point
# -------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
