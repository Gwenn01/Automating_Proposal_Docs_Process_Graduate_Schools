from database.connection import get_db_connection
import json

def insert_proposal_history(proposal_id, user_id, version_no):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO proposal_history (proposal_id, user_id, version_no)
            VALUES (%s, %s, %s)
        """, (
            proposal_id,
            user_id,
            version_no
        ))

        conn.commit()
        history_id = cursor.lastrowid
        return history_id
    except Exception as e:
        print(e)
        return False
    
def insert_cover_page_history(history_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO proposal_cover_page_history (
                history_id,
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
                %(history_id)s,
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
        """, {
            **data,
            "history_id": history_id
        })

        conn.commit()
        return cursor.rowcount == 1

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()

import json


import json

def insert_proposal_content_history(history_id, data):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        payload = data.copy()

        # -----------------------------
        # JSON columns (MUST be valid JSON)
        # -----------------------------
        json_fields = [
            "org_and_staffing_json",
            "activity_schedule_json",
            "budget_breakdown_json",
            "expected_output_6ps",
            "methodology"  # 🔥 FIX HERE
        ]

        for field in json_fields:
            if field in payload and payload[field] is not None:
                # If already dict/list → dump
                if isinstance(payload[field], (dict, list)):
                    payload[field] = json.dumps(payload[field])
                # If plain string → wrap as JSON string
                elif isinstance(payload[field], str):
                    payload[field] = json.dumps(payload[field])

        # -----------------------------
        # List fields
        # -----------------------------
        list_fields = ["members", "collaborating_agencies"]

        for field in list_fields:
            if field in payload and payload[field] is not None:
                if isinstance(payload[field], list):
                    payload[field] = json.dumps(payload[field])

        cursor.execute("""
            INSERT INTO proposal_content_history (
                history_id,
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
                %(history_id)s,
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
        """, {
            **payload,
            "history_id": history_id
        })

        conn.commit()
        return cursor.rowcount == 1

    except Exception as e:
        conn.rollback()
        print("insert_proposal_content_history error:", e)
        raise

    finally:
        cursor.close()
        conn.close()


