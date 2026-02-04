from utils.execute_query import execute_query

def check_notification(user_id):
    try:
        query = """
            SELECT 1 FROM notifications
            WHERE user_id = %s AND DATE(created_at) = CURDATE()
        """
        params = (user_id,)
        result = execute_query(query, params, True)
        return result
    except Exception as e:
        print(e)
        return None