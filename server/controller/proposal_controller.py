from flask import request, jsonify
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

# fetching proposals into database
def get_user_proposals_controller(user_id):
    try:
        proposals = implementor_view_proposal_mapper(fetch_user_proposals(user_id))
        return jsonify({"proposals": proposals}), 200
    except Exception:
        return jsonify({"message": "Failed to fetch proposals"}), 500


def get_user_coverpage_proposal_controller(proposal_id):
    try:
        cover_page = view_cover_page_structured_mapper(fetch_proposal_cover_page(proposal_id))
        return jsonify({"cover_pages": cover_page}), 200
    except Exception:
        return jsonify({"message": "Failed to fetch cover page"}), 500


def get_user_content_proposal_controller(proposal_id):
    try:
        content_page = view_content_mapper(fetch_proposal_content(proposal_id))
        return jsonify({"content_pages": content_page}), 200
    except Exception:
        return jsonify({"message": "Failed to fetch content page"}), 500