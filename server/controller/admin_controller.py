from flask import jsonify, request
# admin overview
from controller.mapper.admin_overview_mapper import (
    status_cycle_mapper, 
    static_cards_mapper,
    pie_data_mapper,
    bar_data_mapper,
)
from model.admin.get_total_documents import get_monthly_document_status_counts

# admin assign reviewer
from model.admin.get_total_documents import get_all_documents_with_user
from model.admin.get_reviewer_user import get_reviewers_with_assignment
from model.admin.put_assign_review import (
    assign_reviewer, increment_review_count, reassign_reviewer, decrement_review_count
)
from controller.mapper.admin_assign_reviewer_mapper import (
    get_proposal_with_user_mapper,
    get_reviewer_mapper,

)
from middleware.assign_review_validator import assign_reviewer_validation



# ADMIN OVERVIEW PAGES
def get_overview_data_controller():
    data = {}
    data['status_cycle'] = status_cycle_mapper()
    data['static_cards'] = static_cards_mapper()
    data['pie_data'] = pie_data_mapper()
    rows = get_monthly_document_status_counts()
    data["bar_data"] = bar_data_mapper(rows)

    
    try:
        return jsonify(data), 200
    except Exception as e:
        return {"error": str(e)}
  
# ADMIN ASSIGN TO REVIEW PAGE  
def get_all_documents_with_user_controller():
    try:
        docs_data = []
        seen = set()

        for row in get_all_documents_with_user():
            format_data = get_proposal_with_user_mapper(row)

            # unique key (user + title)
            unique_key = (format_data["user_id"], format_data["title"])

            if unique_key not in seen:
                seen.add(unique_key)
                docs_data.append(format_data)

        return jsonify(docs_data), 200
    except Exception as e:
        return {"error": str(e)}   
    

def get_all_reviewers_controller():
    try:
        data = request.get_json()
        proposal_id = data['proposal_id']
        reviewer_data = []
        reviewer = get_reviewers_with_assignment(proposal_id)
        for r in reviewer:
            format_reviewer = get_reviewer_mapper(r)
            reviewer_data.append(format_reviewer)
        return jsonify(reviewer_data), 200
    except Exception as e:
        return {"error": str(e)}


def assign_reviewer_controller():
    try:
        data = request.get_json()
        #check the data if is in right format
        if not  assign_reviewer_validation(data):
            return jsonify({"message": "Invalid Data"}), 400
        proposal_id = data["proposal_id"]
        
        # assign reviewers
        for r in data["reviewers"]:
           #debugger in database 
           success_assign = assign_reviewer(proposal_id, r["reviewer_id"])
           success_increment = increment_review_count(proposal_id)
           if not success_assign or not success_increment:
               return jsonify({"message": "Error in Inserting to database"
                               }), 400
               
        return jsonify({"message": "Reviewer Assigned Successfully"}), 200
    except Exception as e:
        return {"error": str(e)}
    
          
def reassign_reviewer_controller():
    try:
        data = request.get_json()
        #check the data if is in right format
        if not  assign_reviewer_validation(data):
            return jsonify({"message": "Invalid Data"}), 400
        proposal_id = data["proposal_id"]
        
        for r in data["reviewers"]:
             #debugger in database 
           success_reassign = reassign_reviewer(proposal_id, r["reviewer_id"]) 
           success_decrement = decrement_review_count(proposal_id)
           if not success_reassign or not success_decrement:
               return jsonify({"message": "Error in Inserting to database"}
                              ), 400
               
        return jsonify({"message": "Reviewer Re-Assigned Successfully"}), 200
    except Exception as e:
        return {"error": str(e)}
    
# ADMIN ASSIGN TO REVIEW PAGE 
def get_all_user_controller():
    try:
        ...
        return jsonify(), 200
    except Exception as e:
        return {"error": str(e)} 