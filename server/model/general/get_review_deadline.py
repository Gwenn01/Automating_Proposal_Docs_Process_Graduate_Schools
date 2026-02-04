from utils.execute_query import execute_query

def get_review_deadline_db():
    try:
        query = """
        SELECT user_id, review_deadline
            FROM proposal_reviews
            WHERE review_deadline > NOW()
        """
        
        return execute_query(query, None, True)
    except Exception as e:
        print(e)
        return None