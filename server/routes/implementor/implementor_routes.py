from flask import Blueprint
from controller.implementor_controller import revise_proposals_controller

implementor_bp = Blueprint('implementor_bp', __name__)

@implementor_bp.route('/update-proposal-docs', methods=['POST'])
def update_docs_implementor():
    # {
    #     "proposal_id": 1,
    #     "user_id": 7,
    #     "cover": {
    #         "submission_date": "2025-01-20",
    #         "board_resolution_title": "Board Resolution Approving Project",
    #         "board_resolution_no": "Resolution No. 1436, S. 2025",
    #         "approved_budget_words": "One Million Pesos",
    #         "approved_budget_amount": 1000000.00,
    #         "duration_words": "One Year",
    #         "duration_years": 1,
    #         "date_from_to": "Jan 2025 – Dec 2025",
    #         "activity_title": "Community Development Project",
    #         "activity_date": "2025-02-15",
    #         "activity_venue": "Barangay Hall",
    #         "activity_value_statement": "Promotes sustainable development",
    #         "requested_activity_budget": 250000,
    #         "prmsu_participants_words": "Twenty Participants",
    #         "prmsu_participants_num": 20,
    #         "partner_agency_participants_words": "Ten Participants",
    #         "partner_agency_participants_num": 10,
    #         "partner_agency_name": "LGU Zambales",
    #         "trainees_words": "Thirty Trainees",
    #         "trainees_num": 30
    #     },
    #     "content": {
    #     "program_title": "University Community Extension Program",
    #     "project_title": "Sustainable Livelihood Training",
    #     "activity_title": "Community-Based Skills Development Program",
    #     "sdg_alignment": "SDG 1: No Poverty, SDG 8: Decent Work",
    #     "extension_agenda": "Community Empowerment and Capacity Building",
    #     "project_leader": "Dr. Juan Dela Cruz",

    #     "college_campus_program": "College of Information Technology",
    #     "community_location": "Iba, Zambales",
    #     "target_sector": "Unemployed Adults",
    #     "number_of_beneficiaries": 99,
    #     "implementation_period": "2026 - 2027",
    #     "total_budget_requested": 1000000,

    #     "rationale": "The project aims to provide livelihood opportunities and practical skills to community members.",
    #     "significance": "This project will enhance employability, economic stability, and community self-reliance.",
    #     "general_objectives": "To improve community livelihood skills through structured training programs.",
    #     "specific_objectives": "To provide skills training, improve employability, and establish sustainable income opportunities.",
    #     "methodology": "Workshops, hands-on training, group activities, and community engagement.",

    #     "members": [
    #         "Kian Fontillas",
    #         "Peter James Marteja"
    #     ],

    #     "collaborating_agencies": [
    #         "Barangay San Marcelino",
    #         "Provincial Government of Zambales"
    #     ],

    #     "expected_output_6ps": {
    #         "publications": "Training modules and instructional materials",
    #         "patents": "Not applicable",
    #         "products": "Skilled and employable community members",
    #         "people_services": "Capacity-building and livelihood services",
    #         "places_partnerships": "Partnership with barangay and local agencies",
    #         "policy": "Community livelihood development initiatives"
    #     },

    #     "social_impact": "Improved social participation and self-confidence among beneficiaries.",
    #     "economic_impact": "Increased income opportunities and reduced unemployment in the community.",

    #     "sustainability_plan": "The program will be sustained through partnerships with local government units and continuous skills development initiatives.",

    #     "org_and_staffing_json": [
    #         {
    #         "activity": "Proposal Preparation",
    #         "designation": "Project Coordinator",
    #         "terms": "Overall planning and documentation"
    #         },
    #         {
    #         "activity": "Program and Certificates",
    #         "designation": "Administrative Staff",
    #         "terms": "Preparation of certificates and program materials"
    #         },
    #         {
    #         "activity": "Food Preparation",
    #         "designation": "Logistics Team",
    #         "terms": "Meal planning and distribution"
    #         },
    #         {
    #         "activity": "Resource Speakers",
    #         "designation": "Training Facilitators",
    #         "terms": "Conduct lectures and hands-on training"
    #         },
    #         {
    #         "activity": "Master of Ceremony",
    #         "designation": "Program Moderator",
    #         "terms": "Facilitate program flow"
    #         },
    #         {
    #         "activity": "Secretariat for Attendance",
    #         "designation": "Administrative Support",
    #         "terms": "Attendance tracking and record keeping"
    #         },
    #         {
    #         "activity": "Documentation and Technical Support",
    #         "designation": "Technical Staff",
    #         "terms": "Photo documentation and report preparation"
    #         }
    #     ],

    #     "activity_schedule_json": {
    #         "activity_title": "Community-Based Skills Development Program",
    #         "activity_date": "2026-02-07",
    #         "schedule": [
    #         {
    #             "time": "08:00 AM",
    #             "activity": "Registration of Participants"
    #         },
    #         {
    #             "time": "09:00 AM",
    #             "activity": "Opening Program and Orientation"
    #         },
    #         {
    #             "time": "10:00 AM",
    #             "activity": "Skills Training Session"
    #         },
    #         {
    #             "time": "03:00 PM",
    #             "activity": "Closing Program and Evaluation"
    #         }
    #         ]
    #     },

    #     "budget_breakdown_json": {
    #         "meals": [
    #         {
    #             "item": "Snacks and Lunch",
    #             "amount": 1000
    #         }
    #         ],
    #         "supplies": [
    #         {
    #             "item": "Training Materials",
    #             "amount": 900
    #         }
    #         ],
    #         "transport": [
    #         {
    #             "item": "Vehicle Rental",
    #             "amount": 13350
    #         }
    #         ],
    #         "totals": {
    #         "meals": 1000,
    #         "transport": 13350,
    #         "supplies": 900,
    #         "grand_total": 15250
    #         }
    #     },

    #     "prmsu_participants_count": null,
    #     "partner_agency_participants_count": null,
    #     "trainees_count": null
    #     }
    # }
    return revise_proposals_controller()