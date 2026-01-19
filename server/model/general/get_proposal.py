from database.connection import get_db_connection

def fetch_user_proposals(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT 
                proposal_id,
                title,
                file_path,
                status,
                reviewer_count,
                reviewed_count,
                submission_date
            FROM proposals_docs
            WHERE user_id = %s
            ORDER BY submission_date DESC
        """, (user_id,))
        return cursor.fetchall()

    finally:
        cursor.close()
        conn.close()


def fetch_proposal_cover_page(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT *
            FROM proposal_cover_page
            WHERE proposal_id = %s
        """, (proposal_id,))
        return cursor.fetchall()

    finally:
        cursor.close()
        conn.close()


def fetch_proposal_content(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT *
            FROM proposal_content
            WHERE proposal_id = %s
        """, (proposal_id,))
        return cursor.fetchall()

    finally:
        cursor.close()
        conn.close()
