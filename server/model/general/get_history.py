from utils.execute_query import execute_query

def get_history_db(proposal_id):
    try:
        ...
        query = """
           SELECT
                pd.proposal_id,
                NULL AS history_id,
                pd.edit_version_count,
                pd.last_edited_at AS changed_at,
                'current' AS source
            FROM proposals_docs pd
            WHERE pd.proposal_id = %s

            UNION ALL

            SELECT
                ph.proposal_id,
                ph.history_id,
                ph.version_no,
                ph.changed_at,
                'history' AS source
            FROM proposal_history ph
            WHERE ph.proposal_id = %s

            ORDER BY changed_at DESC;
        """
        params = (proposal_id, proposal_id,)
        return execute_query(query, params, True)
    except Exception as e:
        print(e)
        return None
    
def get_history_cover_page_db(history_id):
    try:
        ...
        query = """
            SELECT * FROM proposal_cover_page_history WHERE history_id = %s;
        """
        params = (history_id,)
        return execute_query(query, params, True)
    except Exception as e:
        print(e)
        return None
    
def get_history_content_db(history_id):
    try:
        ...
        query = """
            SELECT * FROM proposal_content_history WHERE history_id = %s;
        """
        params = (history_id,)
        return execute_query(query, params, True)
    except Exception as e:
        print(e)
        return None

