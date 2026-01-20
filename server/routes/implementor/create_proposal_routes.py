from flask import Blueprint, request
from controller.proposal_controller import save_proposal, update_proposal_cover_page, update_proposal_content   

create_proposal_bp = Blueprint("create_proposal_bp", __name__)

@create_proposal_bp.route("/create-proposal", methods=["POST"])
def create_proposal():
    return save_proposal()
    
@create_proposal_bp.route("/cover/<int:proposal_id>", methods=["PUT"])
def update_cover_page(proposal_id):
    data = request.json
    return update_proposal_cover_page(proposal_id, data)

@create_proposal_bp.route("/content/<int:proposal_id>", methods=["PUT"])
def update_proposal_content_route(proposal_id):
    data = request.json
    return update_proposal_content(proposal_id, data)
