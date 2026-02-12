from utils.execute_query import execute_query

def check_notification(user_id, title, days_left):
    try:
        query = """
            SELECT 1
            FROM notifications
            WHERE user_id = %s
            AND message = %s
            AND DATE(CONVERT_TZ(created_at, '+00:00', '+08:00')) = CURDATE()
            LIMIT 1
        """

        message = f"You have {days_left} day(s) remaining to review the task titled '{title}'."

        params = (user_id, message)
        result = execute_query(query, params, True)
        return result is not None

    except Exception as e:
        print(e)
        return False
