from database.connection import get_db_connection
from werkzeug.security import generate_password_hash

def edit_account(user_id, fullname, email, password, role):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            UPDATE users
            SET fullname = %s,
                email = %s,
                password = %s,
                role = %s
            WHERE user_id = %s
        """

        hashed_password = generate_password_hash(password)

        cursor.execute(
            query,
            (fullname, email, hashed_password, role, user_id)
        )

        connection.commit()
        cursor.close()
        connection.close()
        return True

    except Exception as e:
        print(f"Error editing account: {e}")
        return False
