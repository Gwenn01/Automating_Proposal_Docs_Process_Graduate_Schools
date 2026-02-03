from utils.execute_query import execute_query

def handle_check_edit_proposal(proposal_id, user_id):
    try:
        ...
        query = """
            SELECT 
                * 
            FROM proposals_docs 
            WHERE proposal_id = %s AND user_id = %s
        """
        params = (proposal_id, user_id)
        result = execute_query(query, params)
        return result
    except Exception as e:
        print(e)
        return False