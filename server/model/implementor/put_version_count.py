from database.connection import get_db_connection

def put_version_count(proposal_id):
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Update the proposal
        cursor.execute(
            """
            UPDATE proposals_docs
            SET 
                edit_version_count = edit_version_count + 1,
                last_edited_at = CURRENT_TIMESTAMP
            WHERE proposal_id = %s
            """,
            (proposal_id,)
        )

        # Fetch the updated count
        cursor.execute(
            """
            SELECT edit_version_count
            FROM proposals_docs
            WHERE proposal_id = %s
            """,
            (proposal_id,)
        )

        row = cursor.fetchone()
        conn.commit()

        return row["edit_version_count"] if row else None

    except Exception as e:
        if conn:
            conn.rollback()
        print("put_version_count error:", e)
        return None

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
