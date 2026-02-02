from model.general.get_proposal import (
    fetch_user_proposals,
    fetch_proposal_cover_page,
    fetch_proposal_content
)
from controller.mapper.proposal_mapper import (
    implementor_view_proposal_mapper, 
    view_cover_page_format_mapper,
    view_cover_page_structured_mapper,
    view_content_mapper
)
from controller.mapper.admin_overview_mapper import (
    status_cycle_mapper, 
    static_cards_mapper,
    pie_data_mapper,
    bar_data_mapper,
)
from model.admin.get_total_documents import get_monthly_document_status_counts
from controller.admin_controller import get_overview_data_controller
from model.admin.get_total_documents import get_all_documents_with_user
from model.admin.get_reviewer_user import get_reviewers_with_assignment
from controller.mapper.admin_assign_reviewer_mapper import get_proposal_with_user_mapper
from model.admin.get_total_user import get_all_users
from model.reviewer.get_docs_for_reviewer import get_docs_for_reviewers
from model.admin.get_total_documents import get_all_documents
from model.general.get_reviews import get_reviews
from controller.mapper.reviewer_get_docs_mapper import get_docs_mapper
from model.reviewer.get_docs_for_reviewer import get_docs_for_reviewers
from model.general.get_proposal import (
    fetch_proposal_cover_page,
    fetch_proposal_content
)
from controller.mapper.reviewer_get_docs_mapper import get_review_per_docs_mapper
from model.general.get_assigned_reviewer import get_assigned_reviewer
from controller.implementor_controller import revise_proposals_controller
from model.reviewer.get_reviewer import get_reviewer_id
from model.reviewer.insert_review_history import insert_review_history, insert_review_items_history
from model.general.get_reviews import get_review_base_proposal_user_id

from model.implementor.put_proposals import (
    update_proposal_cover_page_db,
    update_proposal_content_db,
    update_reviews,
    update_review_item,
    updated_reviewed_count_zero,
    update_is_reviewed,
    update_proposal_status
)
from model.general.get_history import get_history_db

def run_tests_controller():
    # data = fetch_user_proposals(7)
    # print(implementor_view_proposal(data))
    #print(view_cover_page_structured_mapper(fetch_proposal_cover_page(24)))
    #print(view_content_mapper(fetch_proposal_content(11)))
    # print(pie_data_mapper())
    
    # rows = get_monthly_document_status_counts()
    # print(bar_data_mapper(rows))
    # docs_data = []
    # data = get_all_documents_with_user()
    # for d in data:
    #     docs_data.append(get_proposal_with_user_mapper(d))
    #     print(get_proposal_with_user_mapper(d))
    # print(docs_data)
    #print(get_reviewer_user()[0]["fullname"])
    # data = get_reviewer_user()
    # for d in data:
    #     print(d["fullname"])
    #print(get_reviewers_with_assignment(1))
    #print(get_all_users())
    #print(get_docs_for_reviewer(2))
    
    #print(get_all_documents())
    #print(get_reviews(1))
    # docs = get_docs_for_reviewers(6)
    # print(docs)
    # data_docs = [get_docs_mapper(d) for d in docs]
    # print(data_docs)
    
    #print(get_assigned_reviewer(2))     
    #print(fetch_proposal_cover_page(1))
    # data = {
    #     "proposal_id": 2,
    #     "user_id": 7
    # }
    # revise_proposals_controller(data)
    # reviewer_id = get_reviewer_id(2)
    # print(reviewer_id)
    # for reviewer in reviewer_id:
    #     review_history_id = insert_review_history(history_id, reviewer["user_id"], version_no)
    #     print(review_history_id)
    #print(get_review_base_proposal_user_id(2, 1))
    
    # data =  {
#     "proposal_id": 1,
#     "user_id": 7,
#     "cover": {
#         "submission_date": "2026-07-15",
#         "board_resolution_title": "eqwewBoard Resolution Approving Final Revision",
#         "board_resolution_no": "ewqeResolution No. 1623, S. 2026",
#         "approved_budget_words": "Sewqeix Hundred Thousand Pesos",
#         "approved_budget_amount": 600000.00,
#         "duration_words": "Eight Months",
#         "duration_years": 0.67,
#         "date_from_to": "July 2026 – February 2027",
#         "activity_title": "Advanced Youth Skills Development Program",
#         "activity_date": "2026-08-10",
#         "activity_venue": "PRMSU Engineering Laboratory",
#         "activity_value_statement": "Strengthening technical competencies for workforce readiness",
#         "requested_activity_budget": 220000,
#         "prmsu_participants_words": "Twenty Participants",
#         "prmsu_participants_num": 20,
#         "partner_agency_participants_words": "Eight Participants",
#         "partner_agency_participants_num": 8,
#         "partner_agency_name": "TESDA Regional Office III",
#         "trainees_words": "Fifty Trainees",
#         "trainees_num": 50
#     },
#     "content": {
#         "program_title": "Aewqeqdvanced Community Skills Development Program",
#         "project_title": "Youth Workforce Readiness Initiative",
#         "activity_title": "Advanced Electrical Installation and Metal Fabrication Training",
#         "sdg_alignment": "Goal 4: Quality Education; Goal 8: Decent Work and Economic Growth",
#         "extension_agenda": "Technical Skills Advancement and Employment Support",
#         "project_leader": "Engr. Maria L. Fernandez",
#         "members": "John Dela Rosa; Patrick Lim; Sofia Mendoza",
#         "college_campus_program": "College of Engineering - Iba Campus",
#         "collaborating_agencies": "TESDA Region III; Provincial LGU Zambales",
#         "community_location": "Barangay Sta. Rita, Iba, Zambales",
#         "target_sector": "Unemployed and Underemployed Youth",
#         "number_of_beneficiaries": 50,
#         "implementation_period": "July 2026 – February 2027",
#         "total_budget_requested": 220000.00,
#         "rationale": "A follow-up assessment revealed the need for higher-level technical competencies among previously trained youth to improve job placement and retention.",
#         "significance": "The project enhances workforce readiness, bridges skills gaps, and contributes to local industry demand for qualified technicians.",
#         "general_objectives": "To equip youth with advanced technical skills for immediate employment or entrepreneurship.",
#         "specific_objectives": "1. Train 50 youth in advanced electrical and fabrication skills. 2. Conduct national competency assessment. 3. Link graduates to partner industries.",
#         "methodology": "Advanced lectures, intensive hands-on training, supervised practicum, competency assessment, and employment facilitation.",
#         "expected_output_6ps": "{\"publications\": \"Advanced Training Manual\", \"patents\": \"N/A\", \"products\": \"50 nationally assessed trainees\", \"people_services\": \"Advanced technical training\", \"places_partnerships\": \"Expanded TESDA–Industry MOAs\", \"policy\": \"LGU workforce development endorsement\"}",
#         "social_impact": "Increased confidence, discipline, and community engagement among trained youth.",
#         "economic_impact": "Higher employability and increased earning potential for beneficiaries.",
#         "sustainability_plan": "Institutionalization of annual advanced training programs supported by LGU, TESDA, and industry partners.",
#         "org_and_staffing_json": "[{\"activity\": \"Overall Coordination\", \"person\": \"Engr. Maria Fernandez\", \"tor\": \"Project oversight and reporting\"}, {\"activity\": \"Skills Training\", \"person\": \"TESDA Master Trainer\", \"tor\": \"Advanced technical instruction and assessment\"}, {\"activity\": \"Industry Linkage\", \"person\": \"Patrick Lim\", \"tor\": \"Employment coordination and partnerships\"}]",
#         "activity_schedule_json": "[{\"time\": \"08:00-09:00 AM\", \"activity\": \"Program Orientation\"}, {\"time\": \"09:00-12:00 PM\", \"activity\": \"Advanced Technical Session\"}, {\"time\": \"01:00-04:30 PM\", \"activity\": \"Workshop and Practicum\"}]",
#         "budget_breakdown_json": "{\"meals\": {\"snacks\": 4000, \"lunch\": 8000}, \"supplies\": {\"equipment\": 60000, \"materials\": 35000}, \"transportation\": 5000, \"total_requested\": 112000}",
#         "prmsu_participants_count": 6,
#         "partner_agency_participants_count": 3,
#         "trainees_count": 50
#     }
# }
    #print(get_history_db(6))
    print("Running test controller..")