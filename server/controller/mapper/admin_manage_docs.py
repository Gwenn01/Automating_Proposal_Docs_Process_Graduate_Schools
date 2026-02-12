
def get_docs_mapper(row):
    ...
    data = {
        "proposal_id": row["proposal_id"],
        "implementor_id": row["user_id"],
        "name": row["fullname"],
        "title": row["title"],
        "submissionDate": row["submission_date"],
        "status": row["status"]
    }
    return data
