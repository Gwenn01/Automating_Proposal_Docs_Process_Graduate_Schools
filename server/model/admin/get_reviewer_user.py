from database.connection import get_db_connection

def get_reviewer_user():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE role = 'reviewer'")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result