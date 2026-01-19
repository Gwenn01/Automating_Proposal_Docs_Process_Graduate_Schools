def validate_login_data(data):
    errors = {}

    if not data:
        return {"body": "Request body must be JSON"}

    if not data.get("email"):
        errors["email"] = "Email is required"

    if not data.get("password"):
        errors["password"] = "Password is required"

    return errors
