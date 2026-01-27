from database.connection import get_db_connection

def insert_account(fullname, email, password, role):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO users (fullname, email, password, role)
            VALUES (%s, %s, %s, %s)
        """
        # Insert the new account into the database
        cursor.execute(query, (fullname, email, password, role))
        conn.commit()

        # Close the database connection
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Error inserting account: {e}")
        return False