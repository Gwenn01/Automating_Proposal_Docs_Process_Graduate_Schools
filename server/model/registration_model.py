from database.connection import get_db_connection

def create_user(fullname, email, hashed_password, role):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO users (fullname, email, password, role)
            VALUES (%s, %s, %s, %s)
        """, (fullname, email, hashed_password, role))

        conn.commit()
        return cursor.lastrowid

    finally:
        cursor.close()
        conn.close()


def create_implementor_info(user_id, campus, department, position):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO implementor_info (user_id, campus, department, position)
            VALUES (%s, %s, %s, %s)
        """, (user_id, campus, department, position))

        conn.commit()

    finally:
        cursor.close()
        conn.close()
