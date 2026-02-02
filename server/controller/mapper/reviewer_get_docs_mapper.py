from datetime import datetime
from textwrap import dedent
import json
from decimal import Decimal

def get_docs_mapper(row):
    data = {
        "id": row["proposal_id"],
        "review_id": row["review_id"],
        "status": row["status"],
        "name": row["fullname"],
        "title": row["title"],
        "date": row["submission_date"],
    }
    return data


# mapper for get review per docs
def get_review_per_docs_mapper(proposal_cover, proposal_content, proposal_review):
    review_for_cover = []
    review_for_project_profile = []
    review_for_rationale = []
    review_for_significance = []
    review_for_general_objectives = []
    review_for_specific_objectives = []
    review_for_methodology = []
    review_for_expected_output_6ps = []
    review_for_sustainability_plan = []
    review_for_org_and_staffing = []
    review_for_activity_schedule = []
    review_for_budget_breakdown = []
    #review_for_participants = []
    
    def safe_json(value, default):
        try:
            return json.loads(value) if value else default
        except Exception:
            return default
        
    for r in proposal_review:
        review_for_cover.append({
            "reviewer_name": r["fullname"],
            "comment": r["cover_letter_feedback"],
        })

        review_for_project_profile.append({
            "reviewer_name": r["fullname"],
            "comment": r["project_profile_feedback"],
        })

        review_for_rationale.append({
            "reviewer_name": r["fullname"],
            "comment": r["rationale_feedback"],
        })

        review_for_significance.append({
            "reviewer_name": r["fullname"],
            "comment": r["significance_feedback"],
        })

        review_for_general_objectives.append({
            "reviewer_name": r["fullname"],
            "comment": r["general_objectives_feedback"],
        })

        review_for_specific_objectives.append({
            "reviewer_name": r["fullname"],
            "comment": r["specific_objectives_feedback"],
        })

        review_for_methodology.append({
            "reviewer_name": r["fullname"],
            "comment": r["methodology_feedback"],
        })

        review_for_expected_output_6ps.append({
            "reviewer_name": r["fullname"],
            "comment": r["expected_output_feedback"],
        })

        review_for_sustainability_plan.append({
            "reviewer_name": r["fullname"],
            "comment": r["sustainability_plan_feedback"],
        })

        review_for_org_and_staffing.append({
            "reviewer_name": r["fullname"],
            "comment": r["org_staffing_feedback"],
        })

        review_for_activity_schedule.append({
            "reviewer_name": r["fullname"],
            "comment": r["work_financial_plan_feedback"],
        })

        review_for_budget_breakdown.append({
            "reviewer_name": r["fullname"],
            "comment": r["budget_summary_feedback"],
        })

        # review_for_participants.append({
        #     "reviewer_name": r["fullname"],
        #     "comment": r["participants_feedback"],
        # })
    
    if not proposal_cover.get('cover_id'):
        proposal_cover['cover_id'] = proposal_cover.get('cover_history_id')

    if not proposal_content.get('content_id'):
        proposal_content['content_id'] = proposal_content.get('content_history_id')

    data = {
        "cover_id": proposal_cover['cover_id'],
        "content_id": proposal_content['content_id'],
        "cover_page": {
            "submission_date": proposal_cover["submission_date"].strftime("%B %d, %Y"),
            "proposal_summary": {
                "program_title": proposal_cover["board_resolution_title"],
                "approved_budget": {
                    "words": proposal_cover["approved_budget_words"],
                    "amount": f"Php {proposal_cover['approved_budget_amount']:,.2f}"
                },
                "duration": {
                    "words": proposal_cover["duration_words"],
                    "years": proposal_cover["duration_years"]
                },
                "proposal_coverage_period": proposal_cover["date_from_to"],
                "board_resolution": proposal_cover["board_resolution_no"]
            },

            "activity_details": {
                "title": proposal_cover["activity_title"],
                "date": str(proposal_cover["activity_date"]),
                "venue": proposal_cover["activity_venue"],
                "value_statement": proposal_cover["activity_value_statement"],
                "requested_budget": f"Php {proposal_cover['requested_activity_budget']:,.2f}"
            },

            "participants": {
                "prmsu": {
                    "words": proposal_cover["prmsu_participants_words"],
                    "count": proposal_cover["prmsu_participants_num"]
                },
                "partner_agency": {
                    "name": proposal_cover["partner_agency_name"],
                    "words": proposal_cover["partner_agency_participants_words"],
                    "count": proposal_cover["partner_agency_participants_num"]
                },
                "trainees": {
                    "words": proposal_cover["trainees_words"],
                    "count": proposal_cover["trainees_num"]
                }
            },
            "reviews": review_for_cover
        },
        "project_profile": {
            "program_title": proposal_content["program_title"],
            "resolution_no": "Resolution No. 1436, s. 2025",
            "project_title": proposal_content["project_title"],
            "activity_title": proposal_content["activity_title"],
            "sdg_alignment": proposal_content["sdg_alignment"],
            "extension_agenda": proposal_content["extension_agenda"],
            "proponents": {
                "project_leader": proposal_content["project_leader"],
                "members": proposal_content["members"]
            },
            "college_campus_program": proposal_content["college_campus_program"],
            "collaborating_agencies": proposal_content["collaborating_agencies"],
            "community_location": proposal_content["community_location"],
            "target_sector": proposal_content["target_sector"],
            "number_of_beneficiaries": proposal_content["number_of_beneficiaries"],
            "implementation_period": proposal_content["implementation_period"],
            "budgetary_requirements": float(proposal_content["total_budget_requested"])
            if isinstance(proposal_content["total_budget_requested"], Decimal)
            else proposal_content["total_budget_requested"],
            "reviews": review_for_project_profile
        },
        "rationale": {
            "rationale_content": proposal_content["rationale"],
            "reviews": review_for_rationale
        },
        "significance": {
            "significance_content": proposal_content["significance"],
            "reviews": review_for_significance
        },
        "objectives": {
            "general_content": proposal_content["general_objectives"],
            "reviews_general": review_for_general_objectives,
            
            "specific_content": proposal_content["specific_objectives"],
            "reviews_specific": review_for_specific_objectives
        },
        "methodology": {
            "methodology_content": proposal_content["methodology"], 
            "reviews": review_for_methodology
        },
        "expected_output_outcome": {
            "6ps": safe_json(proposal_content.get("expected_output_6ps"), {}),
            "reviews": review_for_expected_output_6ps
        },
        "sustainability_plan": {
            "sustainability_plan_content": proposal_content["sustainability_plan"],
            "reviews": review_for_sustainability_plan
        },
        "organization_and_staffing": {
            "organization_and_staffing_content": safe_json(proposal_content["org_and_staffing_json"], []),
            "reviews": review_for_org_and_staffing
        },
        "plan_of_activities": {
            "plan_of_activities_content": safe_json(proposal_content["activity_schedule_json"], []),
            "reviews": review_for_activity_schedule
        },
        "budgetary_requirement": {
            "budgetary_requirement": safe_json(proposal_content["budget_breakdown_json"], {}),
            "reviews": review_for_budget_breakdown
        },
        # "participants_summary": {
        #     "participants_summary": {
        #     "prmsu": proposal_content["prmsu_participants_count"],
        #     "partner_agency": proposal_content["partner_agency_participants_count"],
        #     "trainees": proposal_content["trainees_count"]
        #     },
        #     "reviews": review_for_participants
        # }
    }
    
    return data
    ...