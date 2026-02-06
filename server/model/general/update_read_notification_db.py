from utils.execute_query import execute_query

def update_read_notification_db(user_id, notification_id):
    try:
        query = """
            UPDATE notifications
            SET is_read = true
            WHERE user_id = %s AND id = %s;
        """
        params = (
            user_id,
            notification_id
        )
        return execute_query(query, params) == 1
    except Exception as e:
        print(e)
        return False