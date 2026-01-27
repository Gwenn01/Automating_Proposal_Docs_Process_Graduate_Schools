from database.connection import get_db_connection

def delete_account(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Delete user account
        cursor.execute("DELETE FROM users WHERE user_id = %s", (user_id,))
        conn.commit()

        # Close the database connection
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Error deleting account: {e}")
        return False