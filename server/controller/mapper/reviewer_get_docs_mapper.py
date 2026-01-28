def get_docs_mapper(row):
    data = {
        "id": row["proposal_id"],
        "review_id": row["review_id"],
        "status": row["status"],
        "name": row["fullname"],
        "title": row["title"],
        "date": row["submission_date"],
    }
    return data