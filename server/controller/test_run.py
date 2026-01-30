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
    update_proposal_cover_page,
    update_proposal_content,
    update_reviews,
    update_review_item,
    updated_reviewed_count_zero,
    update_is_reviewed,
    update_proposal_status
)

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
    #     "proposal_id": 2,
    #     "user_id": 7,
    #     "cover": {
    #         "submission_date": "2025-01-20",
    #         "board_resolution_title": "Board Resolution Approving Project",
    #         "board_resolution_no": "Resolution No. 1436, S. 2025",
    #         "approved_budget_words": "One Million Pesos",
    #         "approved_budget_amount": 1000000,
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
    #         "program_title": "Community Extension Program",
    #         "project_title": "Barangay Livelihood Development",
    #         "activity_title": "Skills Training Workshop",

    #         "sdg_alignment": "SDG 1: No Poverty",
    #         "extension_agenda": "Community Empowerment",
    #         "project_leader": "Dr. Juan Dela Cruz",

    #         "members": [
    #             "Maria Santos",
    #             "Pedro Reyes",
    #             "Ana Lopez"
    #         ],

    #         "college_campus_program": "College of Engineering",
    #         "collaborating_agencies": [
    #             "Barangay Council",
    #             "TESDA",
    #             "DOLE"
    #         ],

    #         "community_location": "Barangay San Isidro, Zambales",
    #         "target_sector": "Out-of-school youth",
    #         "number_of_beneficiaries": 50,

    #         "implementation_period": "January–March 2026",
    #         "total_budget_requested": 250000.00,

    #         "rationale": "This project aims to provide livelihood skills to unemployed residents.",
    #         "significance": "Improves income opportunities and community self-reliance.",

    #         "general_objectives": "To enhance employability through skills training.",
    #         "specific_objectives": "To train at least 50 participants in technical skills.",

    #         "methodology": "Lectures, hands-on workshops, and mentoring sessions.",

    #         "expected_output_6ps": {
    #             "people": "Skilled participants",
    #             "prosperity": "Improved income",
    #             "partnership": "LGU and University collaboration"
    #         },

    #         "sustainability_plan": "Continuous training with LGU support.",

    #         "org_and_staffing_json": {
    #             "project_head": "Dr. Juan Dela Cruz",
    #             "trainers": ["Trainer A", "Trainer B"],
    #             "staff": ["Staff 1", "Staff 2"]
    #         },

    #         "activity_schedule_json": [
    #             {
    #                 "date": "2026-01-10",
    #                 "activity": "Orientation"
    #             },
    #             {
    #                 "date": "2026-02-05",
    #                 "activity": "Hands-on Training"
    #             }
    #         ],

    #         "budget_breakdown_json": {
    #             "materials": 100000,
    #             "honorarium": 80000,
    #             "meals": 50000,
    #             "miscellaneous": 20000
    #         }
    #     },
    #     "reviews": {
    #         "review_round": "2st",
    #         "proposal_type": "",
    #         "source_of_fund": "",

    #         "cover_letter_feedback": "",
    #         "form1_proposal_feedback": "",
    #         "project_profile_feedback": "",
    #         "rationale_feedback": "",
    #         "significance_feedback": "",
    #         "general_objectives_feedback": "",
    #         "specific_objectives_feedback": "",
    #         "methodology_feedback": "",
    #         "expected_output_feedback": "",
    #         "potential_impact_feedback": "",
    #         "sustainability_plan_feedback": "",
    #         "org_staffing_feedback": "",
    #         "work_financial_plan_feedback": "",
    #         "budget_summary_feedback": ""
    #     }
    # }
    print("Running test controller..")