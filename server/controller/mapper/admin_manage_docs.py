
def get_docs_mapper(row):
    ...
    data = {
        "id": row["proposal_id"],
        "name": row["fullname"],
        "title": row["title"],
        "submissionDate": row["submission_date"],
        "status": row["status"]
    }
    return data
