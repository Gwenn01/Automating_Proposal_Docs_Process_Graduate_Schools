from database.connection import get_db_connection

def get_docs_for_reviewers(reviewer_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """
        SELECT 
            pr.proposal_id,
            pr.user_id,
            pr.review_id,
            pd.title,
            pd.status,
            pd.reviewer_count,
            pd.reviewed_count,
            pd.submission_date,
            
            u.fullname,
            u.email
        FROM proposal_reviews pr
        LEFT JOIN proposals_docs pd
        ON pr.proposal_id = pd.proposal_id
        LEFT JOIN users u 
        ON pd.user_id = u.user_id
        WHERE pr.user_id = %s
        """,
        (reviewer_id,)
    )
    docs = cursor.fetchall()
    cursor.close()
    conn.close()
    return docs