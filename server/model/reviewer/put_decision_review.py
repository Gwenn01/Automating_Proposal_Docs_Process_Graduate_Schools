from utils.execute_query import execute_query

def put_decision_review(proposal_id, user_id, decision):
    try:
        query = """
            UPDATE proposal_reviews
            SET decision = %s
            WHERE proposal_id = %s AND user_id = %s
        """
        return execute_query(query, (decision, proposal_id, user_id,)) == 1
    except Exception as e:
        print(e)
        return False