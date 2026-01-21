from database.connection import get_db_connection

def assign_reviewer(proposal_id, reviewer_id):
    ...
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
        INSERT INTO proposal_review
        (proposal_id, reviewer_id)
        VALUES (%s, %s)
    """

    cursor.execute(query, (proposal_id, reviewer_id))
    documents = cursor.fetchall()

    cursor.close()
    conn.close()

    return documents

def increment_review_count(proposal_id):
    ...
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
        UPDATE proposal_docs
        SET reviewer_count = reviewer_count + 1
        WHERE proposal_id = %s
    """

    cursor.execute(query, (proposal_id,))
    documents = cursor.fetchall()

    cursor.close()
    conn.close()

    return documents