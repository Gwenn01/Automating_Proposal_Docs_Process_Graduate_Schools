from database.connection import get_db_connection
from flask import jsonify, request
import json
from utils.serialize_data import serialize_json_fields

def insert_proposal(data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO proposals_docs (user_id, title, file_path)
            VALUES (%s, %s, %s)
        """, (
            data["user_id"],
            data["title"],
            data.get("file_path")
        ))

        conn.commit()
        return cursor.lastrowid   # RETURN ONLY DATA

    except Exception as e:
        conn.rollback()
        raise e                  # let controller handle response

    finally:
        cursor.close()
        conn.close()

        
        
def insert_proposal_cover_page(proposal_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        if 'org_and_staffing_json' in data and isinstance(data['org_and_staffing_json'], (list, dict)):
            data['org_and_staffing_json'] = json.dumps(data['org_and_staffing_json'])

        if 'activity_schedule_json' in data and isinstance(data['activity_schedule_json'], (list, dict)):
            data['activity_schedule_json'] = json.dumps(data['activity_schedule_json'])

        if 'budget_breakdown_json' in data and isinstance(data['budget_breakdown_json'], (list, dict)):
            data['budget_breakdown_json'] = json.dumps(data['budget_breakdown_json'])

        if 'expected_output_6ps' in data and isinstance(data['expected_output_6ps'], (list, dict)):
            data['expected_output_6ps'] = json.dumps(data['expected_output_6ps'])

        #  THESE WERE MISSING
        if 'specific_objectives' in data and isinstance(data['specific_objectives'], list):
            data['specific_objectives'] = json.dumps(data['specific_objectives'])

        if 'methodology' in data and isinstance(data['methodology'], list):
            data['methodology'] = json.dumps(data['methodology'])

        # Convert list fields to JSON strings if needed
        if 'members' in data and isinstance(data['members'], list):
            data['members'] = json.dumps(data['members'])

        if 'collaborating_agencies' in data and isinstance(data['collaborating_agencies'], list):
            data['collaborating_agencies'] = json.dumps(data['collaborating_agencies'])

        cursor.execute("""
            INSERT INTO proposal_cover_page (
                proposal_id,
                submission_date,
                board_resolution_title,
                board_resolution_no,
                approved_budget_words,
                approved_budget_amount,
                duration_words,
                duration_years,
                date_from_to,
                activity_title,
                activity_date,
                activity_venue,
                activity_value_statement,
                requested_activity_budget,
                prmsu_participants_words,
                prmsu_participants_num,
                partner_agency_participants_words,
                partner_agency_participants_num,
                partner_agency_name,
                trainees_words,
                trainees_num
            )
            VALUES (
                %(proposal_id)s,
                %(submission_date)s,
                %(board_resolution_title)s,
                %(board_resolution_no)s,
                %(approved_budget_words)s,
                %(approved_budget_amount)s,
                %(duration_words)s,
                %(duration_years)s,
                %(date_from_to)s,
                %(activity_title)s,
                %(activity_date)s,
                %(activity_venue)s,
                %(activity_value_statement)s,
                %(requested_activity_budget)s,
                %(prmsu_participants_words)s,
                %(prmsu_participants_num)s,
                %(partner_agency_participants_words)s,
                %(partner_agency_participants_num)s,
                %(partner_agency_name)s,
                %(trainees_words)s,
                %(trainees_num)s
            )
            ON DUPLICATE KEY UPDATE
                board_resolution_title = VALUES(board_resolution_title),
                approved_budget_amount = VALUES(approved_budget_amount),
                activity_title = VALUES(activity_title)
        """, {**data, "proposal_id": proposal_id})

        conn.commit()
        return True   # just indicate success

    except Exception as e:
        conn.rollback()
        print("Error". e)
        raise e       # let controller handle response

    finally:
        cursor.close()
        conn.close()


def insert_proposal_content(proposal_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
     # Convert JSON fields from objects/arrays to strings for MySQL
        if 'org_and_staffing_json' in data and isinstance(data['org_and_staffing_json'], (list, dict)):
            data['org_and_staffing_json'] = json.dumps(data['org_and_staffing_json'])

        if 'activity_schedule_json' in data and isinstance(data['activity_schedule_json'], (list, dict)):
            data['activity_schedule_json'] = json.dumps(data['activity_schedule_json'])

        if 'budget_breakdown_json' in data and isinstance(data['budget_breakdown_json'], (list, dict)):
            data['budget_breakdown_json'] = json.dumps(data['budget_breakdown_json'])

        if 'expected_output_6ps' in data and isinstance(data['expected_output_6ps'], (list, dict)):
            data['expected_output_6ps'] = json.dumps(data['expected_output_6ps'])

        #  THESE WERE MISSING
        if 'specific_objectives' in data and isinstance(data['specific_objectives'], list):
            data['specific_objectives'] = json.dumps(data['specific_objectives'])

        if 'methodology' in data and isinstance(data['methodology'], list):
            data['methodology'] = json.dumps(data['methodology'])

        # Convert list fields to JSON strings if needed
        if 'members' in data and isinstance(data['members'], list):
            data['members'] = json.dumps(data['members'])

        if 'collaborating_agencies' in data and isinstance(data['collaborating_agencies'], list):
            data['collaborating_agencies'] = json.dumps(data['collaborating_agencies'])

        cursor.execute("""
            INSERT INTO proposal_content (
                proposal_id,
                program_title,
                project_title,
                activity_title,
                sdg_alignment,
                extension_agenda,
                project_leader,
                members,
                college_campus_program,
                collaborating_agencies,
                community_location,
                target_sector,
                number_of_beneficiaries,
                implementation_period,
                total_budget_requested,
                rationale,
                significance,
                general_objectives,
                specific_objectives,
                methodology,
                expected_output_6ps,
                sustainability_plan,
                org_and_staffing_json,
                activity_schedule_json,
                budget_breakdown_json,
                prmsu_participants_count,
                partner_agency_participants_count,
                trainees_count
            )
            VALUES (
                %(proposal_id)s,
                %(program_title)s,
                %(project_title)s,
                %(activity_title)s,
                %(sdg_alignment)s,
                %(extension_agenda)s,
                %(project_leader)s,
                %(members)s,
                %(college_campus_program)s,
                %(collaborating_agencies)s,
                %(community_location)s,
                %(target_sector)s,
                %(number_of_beneficiaries)s,
                %(implementation_period)s,
                %(total_budget_requested)s,
                %(rationale)s,
                %(significance)s,
                %(general_objectives)s,
                %(specific_objectives)s,
                %(methodology)s,
                %(expected_output_6ps)s,
                %(sustainability_plan)s,
                %(org_and_staffing_json)s,
                %(activity_schedule_json)s,
                %(budget_breakdown_json)s,
                %(prmsu_participants_count)s,
                %(partner_agency_participants_count)s,
                %(trainees_count)s
            )
            ON DUPLICATE KEY UPDATE
                project_title = VALUES(project_title),
                rationale = VALUES(rationale),
                methodology = VALUES(methodology),
                budget_breakdown_json = VALUES(budget_breakdown_json)
        """, {**data, "proposal_id": proposal_id})

        conn.commit()
        return True

    except Exception as e:
        conn.rollback()
        raise e   

    finally:
        cursor.close()
        conn.close()