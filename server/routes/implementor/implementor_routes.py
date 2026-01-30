from flask import Blueprint
from controller.implementor_controller import revise_proposals_controller

implementor_bp = Blueprint('implementor_bp', __name__)

@implementor_bp.route('/update-proposal-docs', methods=['POST'])
def update_docs_implementor():
    {
        "proposal_id": 1,
        "user_id": 7,
        "cover": {
            "submission_date": "2025-01-20",
            "board_resolution_title": "Board Resolution Approving Project",
            "board_resolution_no": "Resolution No. 1436, S. 2025",
            "approved_budget_words": "One Million Pesos",
            "approved_budget_amount": 1000000.00,
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
            "program_title": "Resolution No. 1436, s. 2025",
            "project_title": "Integrated Coastal Resource Management and Livelihood Project",
            "activity_title": "Mangrove Rehabilitation and Crab Farming Workshop",
            "sdg_alignment": "Goal 1: No Poverty; Goal 13: Climate Action; Goal 14: Life Below Water",
            "extension_agenda": "Environmental Sustainability and Economic Empowerment",
            "project_leader": "Juan Dela Cruz, Ph.D.",
            "members": "Maria Santos, MSc (Bio); Engr. Pedro Reyes; Ana Lim (Admin)",
            "college_campus_program": "College of Agriculture and Forestry - Iba Campus",
            "collaborating_agencies": "Department of Environment and Natural Resources (DENR) - Zambales; LGU Iba",
            "community_location": "Barangay Sto. Rosario, Iba, Zambales",
            "target_sector": "Registered Fisherfolk Association of Iba",
            "number_of_beneficiaries": 50,
            "implementation_period": "August 2025 - August 2027 (2 Years)",
            "total_budget_requested": 150000.00,
            "rationale": "Based on the needs assessment conducted in July 2025, the local fisherfolk reported a 30% decline in daily catch due to mangrove degradation. This project addresses both environmental restoration and alternative livelihood needs.",
            "significance": "Restoring the mangrove area provides a natural nursery for fish, directly improving catch rates. Simultaneously, the crab farming component offers an immediate alternative income source during the lean season.",
            "general_objectives": "To restore 2 hectares of mangrove forest and establish a sustainable mud crab farming livelihood program for 50 fisherfolk families.",
            "specific_objectives": "1. Plant 5,000 mangrove seedlings by Q4 2025. 2. Train 50 beneficiaries in mud crab fattening techniques. 3. Establish a community-based monitoring team.",
            "methodology": "Phase 1: Community Mobilization and Site Assessment. Phase 2: Capacity Building (Training Workshop). Phase 3: Implementation (Planting and Stocking). Phase 4: Monitoring and Evaluation.",
            "expected_output_6ps": "{\"publications\": \"1 Training Manual on Mud Crab Farming\", \"patents\": \"N/A\", \"products\": \"2 Hectares Reforested Mangrove\", \"people_services\": \"50 Trained Fisherfolk\", \"places_partnerships\": \"MOA with LGU Iba\", \"policy\": \"Barangay Resolution on Mangrove Protection\"}",
            "social_impact": "Strengthened community cooperation and increased environmental awareness among 50 households.",
            "economic_impact": "Projected 20% increase in monthly household income for participating fisherfolk after the first harvest cycle.",
            "sustainability_plan": "A 'Green Fund' will be established where 10% of the crab farming income will be reinvested into mangrove maintenance and future seedling procurement.",
            "org_and_staffing_json": "[{\"activity\": \"Project Management\", \"person\": \"Juan Dela Cruz\", \"tor\": \"Overall supervision and reporting\"}, {\"activity\": \"Technical Training\", \"person\": \"Maria Santos\", \"tor\": \"Module development and lecture\"}, {\"activity\": \"Logistics\", \"person\": \"Ana Lim\", \"tor\": \"Procurement of supplies and food\"}]",
            "activity_schedule_json": "[{\"time\": \"07:30-08:00 AM\", \"activity\": \"Registration\"}, {\"time\": \"08:00-08:30 AM\", \"activity\": \"Opening Program\"}, {\"time\": \"09:00-12:00 PM\", \"activity\": \"Lecture: Mangrove Ecology\"}, {\"time\": \"01:00-04:00 PM\", \"activity\": \"Workshop: Crab Fattening Techniques\"}]",
            "budget_breakdown_json": "{\"meals\": {\"am_snacks\": 3750, \"lunch\": 7500, \"pm_snacks\": 3750}, \"supplies\": {\"seedlings\": 50000, \"crab_crablets\": 30000, \"nets_and_ropes\": 15000}, \"transportation\": 5000, \"total_requested\": 115000}",
            "prmsu_participants_count": 5,
            "partner_agency_participants_count": 3,
            "trainees_count": 50
        }
    }
    return revise_proposals_controller()