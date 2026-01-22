from database.connection import get_db_connection

def get_total_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users WHERE role != 'admin'")
    total_users = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_users

def get_all_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE role != 'admin'")
    total_users = cursor.fetchall()
    cursor.close()
    conn.close()
    return total_users


def get_users_role(role):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM users WHERE role = %s",
        (role,)  
    )

    total_users = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_users
