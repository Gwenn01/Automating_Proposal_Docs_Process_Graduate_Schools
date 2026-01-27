from database.connection import get_db_connection

def get_reviewer_per_docs(proposal_id, reviewer_id):
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    query = """
        SELECT 
            pr.proposal_id,
            pr.user_id,
            u.fullname,
            u.email
        FROM proposal_reviews pr
        LEFT JOIN users u ON pr.user_id = u.user_id
        WHERE pr.proposal_id = %s AND pr.user_id != %s
    """

    cur.execute(query, (proposal_id, reviewer_id))
    reviewer = cur.fetchall()

    cur.close()
    conn.close()
    return reviewer
