from database.connection import get_db_connection

def get_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT user_id, fullname, email, password, role FROM users WHERE email = %s",
            (email,)
        )
        return cursor.fetchone()

    finally:
        cursor.close()
        conn.close()
