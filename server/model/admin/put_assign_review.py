from database.connection import get_db_connection

def assign_reviewer(proposal_id, reviewer_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
          # Check first
        cursor.execute("""
            SELECT review_id
            FROM proposal_reviews
            WHERE proposal_id = %s AND user_id = %s
        """, (proposal_id, reviewer_id))

        existing = cursor.fetchone()
        if existing:
            print("DEBUG: Assignment already exists")
            return False

        query = """
            INSERT INTO proposal_reviews (proposal_id, user_id)
            VALUES (%s, %s)
        """
        cursor.execute(query, (proposal_id, reviewer_id))
        
        query = """
            UPDATE proposals_docs
            SET reviewer_count = reviewer_count + 1
            WHERE proposal_id = %s
        """

        cursor.execute(query, (proposal_id,))
        
        query = """
            UPDATE proposals_docs
            SET status = 'under_review'
            WHERE proposal_id = %s
        """
        cursor.execute(query, (proposal_id,))
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
    # try:
    #     conn = get_db_connection()
    #     cursor = conn.cursor()

      
    #     conn.commit() 
        
    #     return True
    # except Exception as e:
    #     print("Increment review count error:", e)
    #     return False
    # finally:
    #     cursor.close()
    #     conn.close()
        

def reassign_reviewer(proposal_id, reviewer_id):
    ...
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            DELETE FROM proposal_reviews
            WHERE proposal_id = %s
            AND user_id = %s
        """
        cursor.execute(query, (proposal_id, reviewer_id))
        
        query = """
            UPDATE proposals_docs
            SET reviewer_count = GREATEST(0, reviewer_count - 1)
            WHERE proposal_id = %s
        """

        cursor.execute(query, (proposal_id,))
          # check count
        cursor.execute("""
            SELECT reviewer_count
            FROM proposals_docs
            WHERE proposal_id = %s
        """, (proposal_id,))
        reviewer_count = cursor.fetchone()[0]

        # update status only if no reviewers left
        if reviewer_count == 0:
            cursor.execute("""
                UPDATE proposals_docs
                SET status = 'for_review'
                WHERE proposal_id = %s
            """, (proposal_id,))

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
#    try:
#         conn = get_db_connection()
#         cursor = conn.cursor()

       
#         conn.commit() 
        
#         return True
#    except Exception as e:                                     
#         print("Decrement review count error:", e)
#         return False
#    finally:
#         cursor.close()
#         conn.close()