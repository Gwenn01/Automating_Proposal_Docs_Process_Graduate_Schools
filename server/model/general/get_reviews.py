from database.connection import get_db_connection

def get_reviews(proposal_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("""
            SELECT 
                pr.review_id,
                pr.user_id,
                u.fullname,
                pri.*
            FROM proposal_reviews pr
            LEFT JOIN users u 
                ON pr.user_id = u.user_id
            LEFT JOIN proposal_review_items pri 
                ON pr.review_id = pri.review_id
            WHERE pr.proposal_id = %s
        """, (proposal_id,))

        reviews = cur.fetchall()
        cur.close()
        conn.close()
        return reviews
    except Exception as e:
        print(f"Error getting proposal with reviews: {e}")
        return None


# def get_proposal_with_reviews(proposal_id):
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor(dictionary=True)

#         cursor.execute("""
#             SELECT 
#                 pd.proposal_id,
#                 pd.title,
#                 pcp.*,
#                 pc.*,
#                 pr.review_id,
#                 pri.*
#             FROM proposals_docs pd
#             LEFT JOIN proposal_cover_page pcp 
#                 ON pd.proposal_id = pcp.proposal_id
#             LEFT JOIN proposal_content pc 
#                 ON pd.proposal_id = pc.proposal_id
#             LEFT JOIN proposal_reviews pr 
#                 ON pd.proposal_id = pr.proposal_id
#             LEFT JOIN proposal_review_items pri 
#                 ON pr.review_id = pri.review_id
#             WHERE pd.proposal_id = %s
#         """, (proposal_id,))

#         result = cursor.fetchone()
#         cursor.close()
#         conn.close()
#         return result

#     except Exception as e:
#         print(f"Error getting proposal with reviews: {e}")
#         return None
