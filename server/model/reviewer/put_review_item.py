from database.connection import get_db_connection

def put_review_item(review_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
            UPDATE proposal_review_items
            SET
                review_round = %(review_round)s,
                proposal_type = %(proposal_type)s,
                source_of_fund = %(source_of_fund)s,
                cover_letter_feedback = %(cover_letter_feedback)s,
                form1_proposal_feedback = %(form1_proposal_feedback)s,
                project_profile_feedback = %(project_profile_feedback)s,
                rationale_feedback = %(rationale_feedback)s,
                significance_feedback = %(significance_feedback)s,
                general_objectives_feedback = %(general_objectives_feedback)s,
                specific_objectives_feedback = %(specific_objectives_feedback)s,
                methodology_feedback = %(methodology_feedback)s,
                expected_output_feedback = %(expected_output_feedback)s,
                potential_impact_feedback = %(potential_impact_feedback)s,
                sustainability_plan_feedback = %(sustainability_plan_feedback)s,
                org_staffing_feedback = %(org_staffing_feedback)s,
                work_financial_plan_feedback = %(work_financial_plan_feedback)s,
                budget_summary_feedback = %(budget_summary_feedback)s
            WHERE review_id = %(review_id)s
        """

        cursor.execute(query, {
            **data,
            "review_id": review_id,
        })

        conn.commit()
        return cursor.rowcount > 0  # IMPORTANT

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()
