from datetime import datetime

def validate_proposal_data(data):
    errors = {}

    if not data:
        return {"body": "Request body must be JSON"}

    if not data.get("title"):
        errors["title"] = "Title is required"

    return errors
    

def validate_proposal_cover_page_data(data):
    errors = {}

    if not data:
        return {"body": "Request body must be JSON"}

    # Required fields (cover page only)
    required_fields = [
        "submission_date",
        "activity_title",
        "activity_date",
        "requested_activity_budget"
    ]

    for field in required_fields:
        if field not in data or data[field] in (None, "", []):
            errors[field] = "This field is required"

    # Date fields
    date_fields = ["submission_date", "activity_date"]
    for field in date_fields:
        if field in data and data[field]:
            try:
                datetime.strptime(data[field], "%Y-%m-%d")
            except ValueError:
                errors[field] = "Invalid date format (YYYY-MM-DD)"

    # Numeric fields
    numeric_fields = [
        "approved_budget_amount",
        "requested_activity_budget",
        "duration_years",
        "prmsu_participants_num",
        "partner_agency_participants_num",
        "trainees_num"
    ]

    for field in numeric_fields:
        if field in data and data[field] not in (None, ""):
            try:
                float(data[field])
            except (ValueError, TypeError):
                errors[field] = "Must be a valid number"

    return errors


def validate_proposal_content_data(data):
    errors = {}

    if not data:
        return {"body": "Request body must be JSON"}

    # Required content fields
    required_fields = [
        "program_title",
        "project_title",
        "activity_title",
        "project_leader",
        "community_location",
        "target_sector",
        "implementation_period",
        "rationale",
        "general_objectives",
        "methodology"
    ]

    for field in required_fields:
        if field not in data or str(data[field]).strip() == "":
            errors[field] = "This field is required"

    # Numeric fields
    numeric_fields = [
        "number_of_beneficiaries",
        "total_budget_requested",
        "prmsu_participants_count",
        "partner_agency_participants_count",
        "trainees_count"
    ]

    for field in numeric_fields:
        if field in data and data[field] not in (None, ""):
            try:
                float(data[field])
            except (ValueError, TypeError):
                errors[field] = "Must be a valid number"

    # JSON fields
    json_fields = [
        "org_and_staffing_json",
        "activity_schedule_json",
        "budget_breakdown_json"
    ]

    for field in json_fields:
        if field in data and data[field] is not None:
            if not isinstance(data[field], (dict, list)):
                errors[field] = "Must be a valid JSON object or array"

    # List fields
    list_fields = [
        "members",
        "collaborating_agencies"
    ]

    for field in list_fields:
        if field in data and data[field] is not None:
            if not isinstance(data[field], list):
                errors[field] = "Must be a list"

    return errors