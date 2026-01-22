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
    print("Running test controller..")