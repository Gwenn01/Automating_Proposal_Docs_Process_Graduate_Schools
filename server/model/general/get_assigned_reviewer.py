from database.connection import get_db_connection

def get_assigned_reviewer(proposal_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT 
                pd.proposal_id,
                is_reviewed,
                u.fullname
            FROM proposals_docs pd 
            LEFT JOIN proposal_reviews pr
            ON pd.proposal_id = pr.proposal_id
            LEFT JOIN users u ON pr.user_id = u.user_id
            WHERE pd.proposal_id = %s
        """
        cursor.execute(query, (proposal_id,))
        result = cursor.fetchall()
        cursor.close()
        conn.close()
        return result
    except Exception as e:
        print(e)
        return None
    