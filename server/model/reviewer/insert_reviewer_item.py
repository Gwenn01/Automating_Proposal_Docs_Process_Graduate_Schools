from database.connection import get_db_connection
from flask import json

# check if the reviews item is already exist
def check_reviews_item(review_id):
    db = get_db_connection()
    cursor = db.cursor()

    try:
        query = """
            SELECT 1 FROM proposal_review_items 
            WHERE review_id = %s 
            LIMIT 1
        """
        cursor.execute(query, (review_id,))
        result = cursor.fetchone()

        return result is not None

    finally:
        cursor.close()
        db.close()


def insert_review_item(review_id, data):
    db = get_db_connection()
    cursor = db.cursor()

    query = """
        INSERT INTO proposal_review_items (
            review_id,
            review_round,
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
            budget_summary_feedback
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
    """

    values = (
        review_id,
        data.get("review_round", "1st"),
        data.get("proposal_type"),
        data.get("source_of_fund"),
        data.get("cover_letter_feedback"),
        data.get("form1_proposal_feedback"),
        data.get("project_profile_feedback"),
        data.get("rationale_feedback"),
        data.get("significance_feedback"),
        data.get("general_objectives_feedback"),
        data.get("specific_objectives_feedback"),
        data.get("methodology_feedback"),
        data.get("expected_output_feedback"),
        data.get("potential_impact_feedback"),
        data.get("sustainability_plan_feedback"),
        data.get("org_staffing_feedback"),
        data.get("work_financial_plan_feedback"),
        data.get("budget_summary_feedback")
    )

    cursor.execute(query, values)
    db.commit()

    cursor.close()
    db.close()

    return True

def updated_reviewed_count(proposal_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        
        query = """
            UPDATE proposals_docs SET reviewed_count = reviewed_count + 1 WHERE proposal_id = %s
        """
        values = (proposal_id,)

        cursor.execute(query, values)
        db.commit()

        cursor.close()
        db.close()
        
        return cursor.rowcount == 1
    except Exception as e:
        print(e)
        return False

def update_is_reviewed(review_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
            UPDATE proposal_reviews 
            SET is_reviewed = 1 
            WHERE review_id = %s
        """

        cursor.execute(query, (review_id,))
        db.commit()

        updated = cursor.rowcount 

        return updated == 1

    except Exception as e:
        print("Update Error:", e)
        return False

    finally:
        cursor.close()
        db.close()

        
