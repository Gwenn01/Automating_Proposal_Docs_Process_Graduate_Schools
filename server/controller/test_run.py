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

def run_tests_controller():
    # data = fetch_user_proposals(7)
    # print(implementor_view_proposal(data))
    #print(view_cover_page_structured_mapper(fetch_proposal_cover_page(24)))
    #print(view_content_mapper(fetch_proposal_content(11)))
    print("Running test controller..")