
def get_all_users_mapper(row):
    users = {
        "id": row["user_id"],
        "name": row["fullname"],
        "email": row["email"],
        "role": row["role"]
    }
    return users