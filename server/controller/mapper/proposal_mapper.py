from datetime import datetime
from textwrap import dedent
import json
from decimal import Decimal

def implementor_view_proposal_mapper(fetch_user_proposals):
    if not fetch_user_proposals:
        return {}
    data = []
    for f in fetch_user_proposals:
        if f["reviewer_count"] == 0:
            reviews_text = "No reviews yet"
        else:
            reviews_text = f'{f["reviewed_count"]} out {f["reviewer_count"]}'

        data.append({
            "proposal_id": f["proposal_id"],
            "title": f["title"],
            "submitted_at": f["submission_date"],
            "status": f["status"],
            "reviews": reviews_text
        })

    return data


def view_cover_page_format_mapper(cover):
    cover = cover[0]
    submission_date = cover["submission_date"].strftime("%B %d, %Y")

    return dedent(f"""
        {submission_date}

        DR. ROY N. VILLALOBOS
        University President
        President Ramon Magsaysay State University

        Dear Sir:

        I have the honor to submit the proposal for your consideration and appropriate action for the
        proposed extension program entitled {cover["board_resolution_title"]}, with the approved budget
        of {cover["approved_budget_words"]} (Php {cover["approved_budget_amount"]:,.2f}), with the duration
        of {cover["duration_words"]} ({cover["duration_years"]}) year(s), covering the period
        {cover["date_from_to"]}, as approved under {cover["board_resolution_no"]}.

        This program includes an activity entitled {cover["activity_title"]}, to be conducted on
        {cover["activity_date"]} at {cover["activity_venue"]}. This activity is valuable as it aims to
        {cover["activity_value_statement"]}. The requested expenses for this activity from the university
        amount to Php {cover["requested_activity_budget"]:,.2f}, which will be used to defray expenses for
        food, transportation, supplies and materials, and other expenses related to the activity.

        Further, there will be {cover["prmsu_participants_words"]} ({cover["prmsu_participants_num"]})
        participants from PRMSU, {cover["partner_agency_participants_words"]}
        ({cover["partner_agency_participants_num"]}) participants from the collaborating agency,
        {cover["partner_agency_name"]}, and {cover["trainees_words"]} ({cover["trainees_num"]}) trainees
        from the abovementioned community.

        Your favorable response regarding this matter will be highly appreciated.

        Prepared by:

        __________________________
        Proponent

        Noted by:

        __________________________
        College Dean

        Endorsed by:

        KATHERINE M. UY, MAEd
        Director, Extension Services

        Recommending Approval:                        Certified Funds Available:

        MARLON JAMES A. DEDICATORIA, Ph.D.            ROBERTO C. BRIONES JR., CPA
        Vice-President, Research and Development     University Accountant IV

        Approved by:

        ROY N. VILLALOBOS, DPA
        University President
        """).strip()
    
    
def view_cover_page_structured_mapper(cover):
    cover = cover[0]

    return {
        "submission_date": cover["submission_date"].strftime("%B %d, %Y"),

        "proposal_summary": {
            "program_title": cover["board_resolution_title"],
            "approved_budget": {
                "words": cover["approved_budget_words"],
                "amount": f"Php {cover['approved_budget_amount']:,.2f}"
            },
            "duration": {
                "words": cover["duration_words"],
                "years": cover["duration_years"]
            },
            "coverage_period": cover["date_from_to"],
            "board_resolution": cover["board_resolution_no"]
        },

        "activity_details": {
            "title": cover["activity_title"],
            "date": str(cover["activity_date"]),
            "venue": cover["activity_venue"],
            "value_statement": cover["activity_value_statement"],
            "requested_budget": f"Php {cover['requested_activity_budget']:,.2f}"
        },

        "participants": {
            "prmsu": {
                "words": cover["prmsu_participants_words"],
                "count": cover["prmsu_participants_num"]
            },
            "partner_agency": {
                "name": cover["partner_agency_name"],
                "words": cover["partner_agency_participants_words"],
                "count": cover["partner_agency_participants_num"]
            },
            "trainees": {
                "words": cover["trainees_words"],
                "count": cover["trainees_num"]
            }
        }
    }   

def view_content_mapper(content):
    # take the latest record only
    content = content[0]

    def safe_json(value, default):
        try:
            return json.loads(value) if value else default
        except Exception:
            return default

    return {
        "project_profile": {
            "program_title": content["program_title"],
            "resolution_no": "Resolution No. 1436, s. 2025",
            "project_title": content["project_title"],
            "activity_title": content["activity_title"],
            "sdg_alignment": content["sdg_alignment"],
            "extension_agenda": content["extension_agenda"],
            "proponents": {
                "project_leader": content["project_leader"],
                "members": content["members"]
            },
            "college_campus_program": content["college_campus_program"],
            "collaborating_agencies": content["collaborating_agencies"],
            "community_location": content["community_location"],
            "target_sector": content["target_sector"],
            "number_of_beneficiaries": content["number_of_beneficiaries"],
            "implementation_period": content["implementation_period"],
            "budgetary_requirements": float(content["total_budget_requested"])
            if isinstance(content["total_budget_requested"], Decimal)
            else content["total_budget_requested"]
        },

        "rationale": content["rationale"],

        "significance": content["significance"],

        "objectives": {
            "general": content["general_objectives"],
            "specific": content["specific_objectives"]
        },

        "methodology": content["methodology"],

        "expected_output_outcome": {
            "6ps": safe_json(content.get("expected_output_6ps"), {})
        },

        "sustainability_plan": content["sustainability_plan"],

        "organization_and_staffing": safe_json(
            content["org_and_staffing_json"], []
        ),

        "plan_of_activities": safe_json(
            content["activity_schedule_json"], []
        ),

        "budgetary_requirement": safe_json(
            content["budget_breakdown_json"], {}
        ),

        "participants_summary": {
            "prmsu": content["prmsu_participants_count"],
            "partner_agency": content["partner_agency_participants_count"],
            "trainees": content["trainees_count"]
        }
    }

    
    
