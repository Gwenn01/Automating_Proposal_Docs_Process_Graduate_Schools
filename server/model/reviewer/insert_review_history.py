from database.connection import get_db_connection

def insert_review_history(history_id, user_id, review_round):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO proposal_review_history (history_id, user_id, review_round)
            VALUES (%s, %s, %s)
            """,
            (history_id, user_id, review_round)
        )

        conn.commit()

        # Get the newly inserted ID
        review_history_id = cursor.lastrowid
        return review_history_id

    except Exception as e:
        conn.rollback()
        print(f" Error inserting review history: {e}")
        return None

    finally:
        cursor.close()
        conn.close()
    
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
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            review_history_id,
            review_item.get("proposal_type"),
            review_item.get("source_of_fund"),
            review_item.get("cover_letter_feedback"),
            review_item.get("form1_proposal_feedback"),
            review_item.get("project_profile_feedback"),
            review_item.get("rationale_feedback"),
            review_item.get("significance_feedback"),
            review_item.get("general_objectives_feedback"),
            review_item.get("specific_objectives_feedback"),
            review_item.get("methodology_feedback"),
            review_item.get("expected_output_feedback"),
            review_item.get("potential_impact_feedback"),
            review_item.get("sustainability_plan_feedback"),
            review_item.get("org_staffing_feedback"),
            review_item.get("work_financial_plan_feedback"),
            review_item.get("budget_summary_feedback"),
            review_item.get("attachment_availability_json")
        ))

        conn.commit()
        return True

    except Exception as e:
        conn.rollback()
        print("insert_review_items_history error:", e)
        raise

    finally:
        cursor.close()
        conn.close()

