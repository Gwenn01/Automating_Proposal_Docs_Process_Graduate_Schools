import json

def serialize_proposal_content(data):
    json_fields = {
        "org_and_staffing_json",
        "activity_schedule_json",
        "budget_breakdown_json",
        "expected_output_6ps",
        "specific_objectives",
        "methodology",
        "members",
        "collaborating_agencies",
    }

    for field in json_fields:
        if field in data and isinstance(data[field], (list, dict)):
            data[field] = json.dumps(data[field])

    return data

