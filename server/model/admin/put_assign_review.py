from database.connection import get_db_connection

def assign_reviewer(proposal_id, reviewer_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            INSERT INTO proposal_reviews (proposal_id, user_id)
            VALUES (%s, %s)
        """

        cursor.execute(query, (proposal_id, reviewer_id))
        conn.commit()   # IMPORTANT

        return True

    except Exception as e:
        print("Assign reviewer error:", e)
        return False

    finally:
        cursor.close()
        conn.close()

def increment_review_count(proposal_id):
    ...
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE proposals_docs
            SET reviewer_count = reviewer_count + 1
            WHERE proposal_id = %s
        """

        cursor.execute(query, (proposal_id,))
        conn.commit() 
        
        return True
    except Exception as e:
        print("Increment review count error:", e)
        return False
    finally:
        cursor.close()
        conn.close()



def reassign_reviewer(proposal_id, reviewer_id):
    ...
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE proposal_reviews
            SET is_reassign = TRUE
            WHERE proposal_id = %s
            AND user_id = %s
        """

        cursor.execute(query, (proposal_id, reviewer_id))
        conn.commit() 
        
        return True
    except Exception as e:
        print("Reassign reviewer error:", e)
        return False
    finally:
        cursor.close()
        conn.close()

def decrement_review_count(proposal_id):
   ...
   try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE proposals_docs
            SET reviewer_count = reviewer_count - 1
            WHERE proposal_id = %s
        """

        cursor.execute(query, (proposal_id,))
        conn.commit() 
        
        return True
   except Exception as e:
        print("Decrement review count error:", e)
        return False
   finally:
        cursor.close()
        conn.close()