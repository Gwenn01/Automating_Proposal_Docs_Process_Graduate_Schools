def validate_registration_data(data):
    errors = {}

    if not data:
        return {"body": "Request body must be JSON"}

    required_fields = ["fullname", "email", "password", "role"]

    for field in required_fields:
        if not data.get(field):
            errors[field] = "This field is required"

    if data.get("role") == "implementor":
        if not data.get("campus"):
            errors["campus"] = "Campus is required for implementor"
        if not data.get("department"):
            errors["department"] = "Department is required for implementor"
        if not data.get("position"):
            errors["position"] = "Position is required for implementor"

    return errors
