from utils.execute_query import execute_query

def put_proposal_deadline_db(proposal_id, user_id):
    try: 
        query = """
            UPDATE proposal_reviews
            SET
                review_deadline = DATE_ADD(NOW(), INTERVAL 7 DAY),
                is_expired = 0
            WHERE proposal_id = %s AND user_id = %s;
        """
        params = (
            proposal_id, 
            user_id,
        )
        return execute_query(query, params) == 1
    except Exception as e:
        print(e)
        return False
    