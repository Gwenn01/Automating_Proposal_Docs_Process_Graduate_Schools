from utils.execute_query import execute_query

def get_review_deadline_db():
    try:
        query = """
        SELECT pr.user_id, 
               pr.review_deadline,
               pd.title
            FROM proposals_docs pd
            LEFT JOIN proposal_reviews pr 
            ON pd.proposal_id = pr.proposal_id
            WHERE pr.review_deadline > NOW()
        """
        
        return execute_query(query, None, True)
    except Exception as e:
        print(e)
        return None