from database.connection import get_db_connection


def execute_query(query, params=None, fetch=False):
    """
    Execute a database query.

    :param query: SQL query
    :param params: tuple or dict of parameters
    :param fetch: set True for SELECT queries
    :return: fetched rows (SELECT) or affected row count (INSERT/UPDATE/DELETE)
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(query, params)

        if fetch:
            result = cursor.fetchall()
        else:
            connection.commit()
            result = cursor.rowcount  # number of affected rows

        cursor.close()
        connection.close()
        return result

    except Exception as e:
        print(f"Error executing query: {e}")
        return None
