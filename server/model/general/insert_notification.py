from utils.execute_query import execute_query

def insert_notification_db(user_id, message):
    try:
        query = """
            INSERT INTO notifications (user_id, message) VALUES (%s, %s)
        """
        params = (user_id, message)
        return execute_query(query, params)
    except Exception as e:
        print(e)
        return False