
def get_proposal_with_user_mapper(row):
    ...
    data = {
        "poposal_id": row["proposal_id"],
        "user_id": row["user_id"],
        "name": row["fullname"],
        "title": row["title"],
        
    }
    return data

def get_reviewer_mapper(row):
    ...
    data = {
        "id": row["user_id"],
        "name": row["fullname"],
        "is_assign": row["is_assigned"]
    }
    return data