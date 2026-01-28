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
                    FROM proposal_reviews pr2
                    WHERE pr2.user_id = u.user_id
                    AND pr2.proposal_id = %s
                )
                THEN 1
                ELSE 0
            END AS is_assigned,
            pr.is_reviewed
        FROM users u
        LEFT JOIN proposal_reviews pr
            ON pr.user_id = u.user_id
        AND pr.proposal_id = %s
        WHERE u.role = 'reviewer';
    """

    cursor.execute(query, (proposal_id, proposal_id,))
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