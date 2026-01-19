from flask import Blueprint, jsonify
from controller.proposal_controller import (
    get_user_proposals,
    get_user_coverpage_proposal,
    get_user_content_proposal
)

proposals_bp = Blueprint("proposals", __name__)

#get all proposals docs by implementor
@proposals_bp.route("/my-proposals/<int:user_id>", methods=["GET"])
def get_user_proposals(user_id):
    return get_user_proposals(user_id)


@proposals_bp.route("/my-coverpage-proposals/<int:proposal_id>", methods=["GET"])
def get_user_coverpage_proposal(proposal_id):
   return get_user_coverpage_proposal(proposal_id)
   
        
@proposals_bp.route("/my-content-proposals/<int:proposal_id>", methods=["GET"])
def get_user_content_proposal(proposal_id):
    return get_user_content_proposal(proposal_id)
    
