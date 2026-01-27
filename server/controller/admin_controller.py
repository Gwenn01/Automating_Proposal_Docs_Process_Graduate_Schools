from flask import jsonify, request
from werkzeug.security import generate_password_hash
# default = pbkdf2:sha256 (secure)

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
    assign_reviewer, increment_review_count, reassign_reviewer, decrement_review_count,

)
from model.admin.insert_account import insert_account
from model.admin.put_account import edit_account
from model.admin.delete_account import delete_account
from controller.mapper.admin_assign_reviewer_mapper import (
    get_proposal_with_user_mapper,
    get_reviewer_mapper,

)
from middleware.assign_review_validator import assign_reviewer_validation

# admin manage account
from model.admin.get_total_user import get_all_users
from controller.mapper.admin_manage_account_mapper import get_all_users_mapper
# admin manage docs
from controller.mapper.admin_manage_docs import get_docs_mapper


# ADMIN OVERVIEW PAGES
def get_overview_data_controller():
    try:
        data = {}
        data['status_cycle'] = status_cycle_mapper()
        data['static_cards'] = static_cards_mapper()
        data['pie_data'] = pie_data_mapper()
        rows = get_monthly_document_status_counts()
        data["bar_data"] = bar_data_mapper(rows)
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
        #    success_increment = increment_review_count(proposal_id)
           if not success_assign:
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
        #    success_decrement = decrement_review_count(proposal_id)
           if not success_reassign:
               return jsonify({"message": "Error in Inserting to database"}
                              ), 400
               
        return jsonify({"message": "Reviewer Re-Assigned Successfully"}), 200
    except Exception as e:
        return {"error": str(e)}
    
# ADMIN MANAGE ACCOUNTS 
def get_all_users_controller():
    try:
        data = []
        users = get_all_users()
        for u in users:
            data.append(get_all_users_mapper(u))
        return jsonify(data), 200
    except Exception as e:
        return {"error": str(e)} 

def create_account_controller():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "There is no data"}), 400
        
        fullname = data.get("fullname")
        email = data.get("email")
        password = data.get("password")
        hash_password = generate_password_hash(password)
        role = data.get("role")
        
        if not fullname or not email or not password or not role:
            return jsonify({"message": "Invalid Data"}), 400
        
        success = insert_account(fullname, email, hash_password, role)
        if not success:
            return jsonify({"message": "Error in Inserting to database"}
                           ), 400
        return jsonify({"message": "Account Created Successfully"}), 200
    except Exception as e:
        return {"error": str(e)}
    
def edit_account_controller():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "There is no data"}), 400

        user_id = data.get("user_id")
        fullname = data.get("fullname")
        email = data.get("email")
        password = data.get("password")
        hash_password = generate_password_hash(password)
        role = data.get("role")
        
        if not id or not fullname or not email or not password or not role:
            return jsonify({"message": "Invalid Data"}), 400

        success = edit_account(user_id, fullname, email, hash_password, role)
        if not success:
            return jsonify({"message": "Error in updating to database"}), 400
        
        return jsonify({"message": "Account Edited Successfully"}), 200
    except Exception as e:
        return {"error": str(e)}
    
def delete_account_controller():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "There is no data"}), 400

        user_id = data.get("user_id")
        success = delete_account(user_id)
        if not success:
            return jsonify({"message": "Error in deleting from database"}), 400
        
        return jsonify({"message": "Account Deleted Successfully"}), 200
    except Exception as e:
        return {"error": str(e)}
    
    
# ADMIN MANAGE DOCS
def get_all_docs_controller():
    try:
        docs_data = []
        seen = set()

        for row in get_all_documents_with_user():
            format_data = get_docs_mapper(row)

            # unique key (user + title)
            unique_key = (format_data["id"], format_data["title"])

            if unique_key not in seen:
                seen.add(unique_key)
                docs_data.append(format_data)

        return jsonify(docs_data), 200
    except Exception as e:
        return {"error": str(e)}   
    
    
