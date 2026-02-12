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
    db = None
    cursor = None

    try:
        db = get_db_connection()
        cursor = db.cursor()

        reviews = data.get("reviews", {})

        if not reviews:
            raise ValueError("Missing 'reviews' object in request body")

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
            reviews.get("review_round", "1st"),
            reviews.get("proposal_type"),
            reviews.get("source_of_fund"),
            reviews.get("cover_letter_feedback"),
            reviews.get("form1_proposal_feedback"),
            reviews.get("project_profile_feedback"),
            reviews.get("rationale_feedback"),
            reviews.get("significance_feedback"),
            reviews.get("general_objectives_feedback"),
            reviews.get("specific_objectives_feedback"),
            reviews.get("methodology_feedback"),
            reviews.get("expected_output_feedback"),
            reviews.get("potential_impact_feedback"),
            reviews.get("sustainability_plan_feedback"),
            reviews.get("org_staffing_feedback"),
            reviews.get("work_financial_plan_feedback"),
            reviews.get("budget_summary_feedback")
        )

        cursor.execute(query, values)
        db.commit()

        return cursor.rowcount == 1

    except Exception as e:
        if db:
            db.rollback()

        print("ERROR inserting review item:", str(e))
        return False

    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

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

        
