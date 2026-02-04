from utils.execute_query import execute_query

def get_notifications(user_id):
    try:
        query = """
            SELECT * FROM notifications WHERE user_id = %s
        """
        params = (user_id,)
        return execute_query(query, params, True) 
    except Exception as e:
        print(e)
        return None