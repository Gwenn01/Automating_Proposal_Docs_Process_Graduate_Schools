from database.connection import get_db_connection

def insert_review_history(history_id, user_id, review_round):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO proposal_review_history (history_id, user_id, review_round)
            VALUES (%s, %s, %s)
            """,
            (history_id, user_id, review_round)
        )
        conn.commit()
        cursor.close()
        conn.close()
    except  Exception as e:
        print(f"Error inserting review history: {e}")
        return False
    
def insert_review_items_history(review_history_id, review_item):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO proposal_review_items_history (
                review_history_id,
                proposal_type,
                source_of_fund,
                cover_letter_feedback,
                form1_proposal_feedback,
                project_profile_feedback,
                rationale_feedback,
                significance_feedback,
                general_objectives_feedback,
                specific_objectives_feedback,
                methodology_feedback,
                expected_output_feedback,
                potential_impact_feedback,
                sustainability_plan_feedback,
                org_staffing_feedback,
                work_financial_plan_feedback,
                budget_summary_feedback,
                attachment_availability_json
            ) VALUES (
                %(review_history_id)s,
                %(proposal_type)s,
                %(source_of_fund)s,
                %(cover_letter_feedback)s,
                %(form1_proposal_feedback)s,
                %(project_profile_feedback)s,
                %(rationale_feedback)s,
                %(significance_feedback)s,
                %(general_objectives_feedback)s,
                %(specific_objectives_feedback)s,
                %(methodology_feedback)s,
                %(expected_output_feedback)s,
                %(potential_impact_feedback)s,
                %(sustainability_plan_feedback)s,
                %(org_staffing_feedback)s,
                %(work_financial_plan_feedback)s,
                %(budget_summary_feedback)s,
                %(attachment_availability_json)s
            )
        """, {
            **review_item,
            "review_history_id": review_history_id
        })

        conn.commit()
        return True

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()
