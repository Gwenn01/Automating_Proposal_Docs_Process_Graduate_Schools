from database.connection import get_db_connection

def get_reviewer_id(proposal_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor(dictionary=True)

        query = """
            SELECT 
                pr.user_id
            FROM proposal_reviews pr
            WHERE pr.proposal_id = %s
        """
        cur.execute(query, (proposal_id,))
        return cur.fetchall()
    except Exception as e:
        print(e)
        return None

def get_reviewer_per_docs(proposal_id, reviewer_id):
    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    query = """
        SELECT 
            pr.proposal_id,
            pr.user_id,
            pr.review_deadline
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
