
def get_proposal_with_user_mapper(row):
    ...
    data = {
        "id": row["user_id"],
        "name": row["fullname"],
        "title": row["title"],
        
    }
    return data
    