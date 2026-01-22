from database.connection import get_db_connection

def get_reviewers_with_assignment(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
        u.user_id,
        u.fullname,
        u.email,
        CASE 
            WHEN EXISTS (
                SELECT 1
                FROM proposal_reviews pr
                WHERE pr.user_id = u.user_id
                AND pr.proposal_id = %s
            )
            THEN 1
            ELSE 0
        END AS is_assigned
    FROM users u
    WHERE u.role = 'reviewer';

    """

    cursor.execute(query, (proposal_id,))
    reviewers = cursor.fetchall()

    cursor.close()
    conn.close()

    return reviewers


def get_proposal_review(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM proposal_review WHERE proposal_id = %s", (proposal_id,))
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result