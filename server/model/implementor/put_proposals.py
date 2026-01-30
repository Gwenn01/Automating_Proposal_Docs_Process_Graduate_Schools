from database.connection import get_db_connection
from flask import json

# def put_proposals(proposal_id):
#     try:
#         ...
#     except Exception as e:
#         print(e)
#         return None
    
def update_proposal_cover_page(proposal_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE proposal_cover_page
            SET
                submission_date = %(submission_date)s,
                board_resolution_title = %(board_resolution_title)s,
                board_resolution_no = %(board_resolution_no)s,
                approved_budget_words = %(approved_budget_words)s,
                approved_budget_amount = %(approved_budget_amount)s,
                duration_words = %(duration_words)s,
                duration_years = %(duration_years)s,
                date_from_to = %(date_from_to)s,
                activity_title = %(activity_title)s,
                activity_date = %(activity_date)s,
                activity_venue = %(activity_venue)s,
                activity_value_statement = %(activity_value_statement)s,
                requested_activity_budget = %(requested_activity_budget)s,
                prmsu_participants_words = %(prmsu_participants_words)s,
                prmsu_participants_num = %(prmsu_participants_num)s,
                partner_agency_participants_words = %(partner_agency_participants_words)s,
                partner_agency_participants_num = %(partner_agency_participants_num)s,
                partner_agency_name = %(partner_agency_name)s,
                trainees_words = %(trainees_words)s,
                trainees_num = %(trainees_num)s
            WHERE proposal_id = %(proposal_id)s
        """, {
            **data,
            "proposal_id": proposal_id
        })

        conn.commit()
        return cursor.rowcount >= 1

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()

    
def update_proposal_content(proposal_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Convert JSON / list fields
        if 'org_and_staffing_json' in data and isinstance(data['org_and_staffing_json'], (list, dict)):
            data['org_and_staffing_json'] = json.dumps(data['org_and_staffing_json'])

        if 'activity_schedule_json' in data and isinstance(data['activity_schedule_json'], (list, dict)):
            data['activity_schedule_json'] = json.dumps(data['activity_schedule_json'])

        if 'budget_breakdown_json' in data and isinstance(data['budget_breakdown_json'], (list, dict)):
            data['budget_breakdown_json'] = json.dumps(data['budget_breakdown_json'])

        if 'expected_output_6ps' in data and isinstance(data['expected_output_6ps'], (list, dict)):
            data['expected_output_6ps'] = json.dumps(data['expected_output_6ps'])

        if 'members' in data and isinstance(data['members'], list):
            data['members'] = json.dumps(data['members'])

        if 'collaborating_agencies' in data and isinstance(data['collaborating_agencies'], list):
            data['collaborating_agencies'] = json.dumps(data['collaborating_agencies'])

        # UPDATE QUERY (FULL)
        cursor.execute("""
            UPDATE proposal_content
            SET
                program_title = %(program_title)s,
                project_title = %(project_title)s,
                activity_title = %(activity_title)s,
                sdg_alignment = %(sdg_alignment)s,
                extension_agenda = %(extension_agenda)s,
                project_leader = %(project_leader)s,
                members = %(members)s,
                college_campus_program = %(college_campus_program)s,
                collaborating_agencies = %(collaborating_agencies)s,
                community_location = %(community_location)s,
                target_sector = %(target_sector)s,
                number_of_beneficiaries = %(number_of_beneficiaries)s,
                implementation_period = %(implementation_period)s,
                total_budget_requested = %(total_budget_requested)s,
                rationale = %(rationale)s,
                significance = %(significance)s,
                general_objectives = %(general_objectives)s,
                specific_objectives = %(specific_objectives)s,
                methodology = %(methodology)s,
                expected_output_6ps = %(expected_output_6ps)s,
                sustainability_plan = %(sustainability_plan)s,
                org_and_staffing_json = %(org_and_staffing_json)s,
                activity_schedule_json = %(activity_schedule_json)s,
                budget_breakdown_json = %(budget_breakdown_json)s
            WHERE proposal_id = %(proposal_id)s
        """, {
            **data,
            "proposal_id": proposal_id
        })

        conn.commit()
        return cursor.rowcount >= 1

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()

def update_reviews(proposal_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        #  Get review_ids BEFORE update
        cursor.execute("""
            SELECT review_id
            FROM proposal_reviews
            WHERE proposal_id = %s
        """, (proposal_id,))

        review_ids = [row["review_id"] for row in cursor.fetchall()]

        #  Perform update
        cursor.execute("""
            UPDATE proposal_reviews
            SET is_reviewed = 0
            WHERE proposal_id = %s
        """, (proposal_id,))

        conn.commit()
        return review_ids   

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()
      
def update_review_item(review_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
            UPDATE proposal_review_items
            SET
                review_round = %s,
                proposal_type = %s,
                source_of_fund = %s,
                cover_letter_feedback = %s,
                form1_proposal_feedback = %s,
                project_profile_feedback = %s,
                rationale_feedback = %s,
                significance_feedback = %s,
                general_objectives_feedback = %s,
                specific_objectives_feedback = %s,
                methodology_feedback = %s,
                expected_output_feedback = %s,
                potential_impact_feedback = %s,
                sustainability_plan_feedback = %s,
                org_staffing_feedback = %s,
                work_financial_plan_feedback = %s,
                budget_summary_feedback = %s
            WHERE review_id = %s
        """

        values = (
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
            data.get("budget_summary_feedback"),
            review_id
        )

        cursor.execute(query, values)
        conn.commit()
        return cursor.rowcount >= 0  #  true if updated

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()
   

def updated_reviewed_count_zero(proposal_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        
        query = """
            UPDATE proposals_docs SET reviewed_count = 0 WHERE proposal_id = %s
        """
        values = (proposal_id,)

        cursor.execute(query, values)
        db.commit()

        cursor.close()
        db.close()
        
        return cursor.rowcount >= 0  
    except Exception as e:
        print(e)
        return False

def update_is_reviewed(review_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
            UPDATE proposal_reviews SET is_reviewed = 0 WHERE review_id = %s
        """
        values = (review_id,)

        cursor.execute(query, values)
        db.commit()

        cursor.close()
        db.close()

        return cursor.rowcount >= 1
    except Exception as e:
        print(e)
        return False
    
def update_proposal_status(proposal_id):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
            UPDATE proposals_docs SET status = 'update_is_reviewed' WHERE proposal_id = %s
        """
        values = (proposal_id,)

        cursor.execute(query, values)
        db.commit()

        cursor.close()
        db.close()

        return cursor.rowcount >= 1
    except Exception as e:
        print(e)
        return False

            
