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
                WHEN pr.user_id IS NOT NULL THEN 1
                ELSE 0
            END AS is_assigned
        FROM users u
        LEFT JOIN proposal_reviews pr
            ON u.user_id = pr.user_id
            AND pr.proposal_id = %s
            AND pr.is_reassign = 0
        WHERE u.role = 'reviewer'
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