from utils.execute_query import execute_query

def get_admin():
    try:
        query = "SELECT * FROM users WHERE role = 'admin'"
        result = execute_query(query, fetch=True)
        return result
    except Exception as e:
        print("Error in get_admin: ", e)
        return None