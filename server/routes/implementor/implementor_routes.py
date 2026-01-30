from flask import Blueprint
from controller.implementor_controller import revise_proposals_controller

implementor_bp = Blueprint('implementor_bp', __name__)

@implementor_bp.route('/update-proposal-docs', methods=['POST'])
def update_docs_implementor():
    {
        "proposal_id": 2,
        "user_id": 7,
        "cover": {
            "submission_date": "2025-01-20",
            "board_resolution_title": "Board Resolution Approving Project",
            "board_resolution_no": "Resolution No. 1436, S. 2025",
            "approved_budget_words": "One Million Pesos",
            "approved_budget_amount": 1000000,
            "duration_words": "One Year",
            "duration_years": 1,
            "date_from_to": "Jan 2025 – Dec 2025",
            "activity_title": "Community Development Project",
            "activity_date": "2025-02-15",
            "activity_venue": "Barangay Hall",
            "activity_value_statement": "Promotes sustainable development",
            "requested_activity_budget": 250000,
            "prmsu_participants_words": "Twenty Participants",
            "prmsu_participants_num": 20,
            "partner_agency_participants_words": "Ten Participants",
            "partner_agency_participants_num": 10,
            "partner_agency_name": "LGU Zambales",
            "trainees_words": "Thirty Trainees",
            "trainees_num": 30
        },
        "content": {
            "program_title": "Community Extension Program",
            "project_title": "Barangay Livelihood Development",
            "activity_title": "Skills Training Workshop",

            "sdg_alignment": "SDG 1: No Poverty",
            "extension_agenda": "Community Empowerment",
            "project_leader": "Dr. Juan Dela Cruz",

            "members": [
                "Maria Santos",
                "Pedro Reyes",
                "Ana Lopez"
            ],

            "college_campus_program": "College of Engineering",
            "collaborating_agencies": [
                "Barangay Council",
                "TESDA",
                "DOLE"
            ],

            "community_location": "Barangay San Isidro, Zambales",
            "target_sector": "Out-of-school youth",
            "number_of_beneficiaries": 50,

            "implementation_period": "January–March 2026",
            "total_budget_requested": 250000.00,

            "rationale": "This project aims to provide livelihood skills to unemployed residents.",
            "significance": "Improves income opportunities and community self-reliance.",

            "general_objectives": "To enhance employability through skills training.",
            "specific_objectives": "To train at least 50 participants in technical skills.",

            "methodology": "Lectures, hands-on workshops, and mentoring sessions.",

            "expected_output_6ps": {
                "people": "Skilled participants",
                "prosperity": "Improved income",
                "partnership": "LGU and University collaboration"
            },

            "sustainability_plan": "Continuous training with LGU support.",

            "org_and_staffing_json": {
                "project_head": "Dr. Juan Dela Cruz",
                "trainers": ["Trainer A", "Trainer B"],
                "staff": ["Staff 1", "Staff 2"]
            },

            "activity_schedule_json": [
                {
                    "date": "2026-01-10",
                    "activity": "Orientation"
                },
                {
                    "date": "2026-02-05",
                    "activity": "Hands-on Training"
                }
            ],

            "budget_breakdown_json": {
                "materials": 100000,
                "honorarium": 80000,
                "meals": 50000,
                "miscellaneous": 20000
            }
        },
    }
    return revise_proposals_controller()