import json

def serialize_json_fields(data, fields):
    for field in fields:
        if field in data and isinstance(data[field], (list, dict)):
            data[field] = json.dumps(data[field])
    return data
