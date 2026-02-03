from model.admin.get_total_documents import (
    get_documents_count,
    get_documents_count_by_status
)
from model.admin.get_total_user import get_total_users, get_users_role
from model.admin.get_total_documents import get_all_documents
from model.admin.get_total_user import get_all_users
from collections import OrderedDict

# get the total user in one fetch
def count_users():
    data = {
        "total_implementor": 0,
        "total_reviewer": 0,
        "total_user": 0
    }
    for user in get_all_users():
        data["total_user"] += 1
        if user["role"] == "implementor":
            data["total_implementor"] += 1
        elif user["role"] == "reviewer":
            data["total_reviewer"] += 1
    return data

def status_cycle_mapper():
    for_review = 0
    under_review =0
    revisions = 0
    approval = 0
    completed = 0
    rejected = 0
    for doc in get_all_documents():
        if doc["status"] == "for_review":
            for_review += 1
        elif doc["status"] == "under_review":
            under_review += 1
        elif doc["status"] == "for_revision":
            revisions += 1
        elif doc["status"] == "for_approval":
            approval += 1
        elif doc["status"] == "approved":
            completed += 1
        elif doc["status"] == "rejected":
            rejected += 1
    data = [
        { f"label": "For Reviews", "value":  for_review },
        { f"label": "Under Reviews", "value": under_review },
        { f"label": "Revisions", "value": revisions },
        { f"label": "For Approval", "value": approval},
        { f"label": "Completed", "value": completed },
        { f"label": "Rejected",  "value": rejected },
       
    ];
    return data

def static_cards_mapper():
    data = count_users()
    total_implementors = data["total_implementor"]
    total_reviewers = data["total_reviewer"]
    total_documents = get_documents_count()
    data = [
        { f"label": "Total Implementors", "value": total_implementors},
        { f"label": "Total Reviewers", "value": total_reviewers},
        { f"label": "Total Documents", "value": total_documents},
    ];
    return data

def pie_data_mapper():
    data = count_users()
    total_implementors = data["total_implementor"]
    total_reviewers = data["total_reviewer"]
    total = data["total_user"]
    data = [
        { f"name": 'Implementor', "value": total_implementors},
        { f"name": 'Reviewers', "value": total_reviewers },
        { f"name": 'Total', "value": total}
    ];
    return data


def bar_data_mapper(rows):
    months = OrderedDict()

    STATUS_MAP = {
        "for_review": "ForReview",
        "under_review": "UnderReview",
        "for_revision": "Revisions",
        "approval": "Approval",
        "completed": "Completed",
        "rejected": "Rejected",
    }

    for r in rows:
        key = f"{r['year']}-{r['month_num']:02d}"

        if key not in months:
            months[key] = {
                "name": r["month_name"],
                "ForReview": 0,
                "UnderReview": 0,
                "Revisions": 0,
                "Approval": 0,
                "Completed": 0,
                "Rejected": 0,
            }

        status_key = STATUS_MAP.get(r["status"])
        if status_key:
            months[key][status_key] = r["total"]

    return list(months.values())
