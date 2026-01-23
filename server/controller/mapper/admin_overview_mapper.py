from model.admin.get_total_documents import (
    get_documents_count,
    get_documents_count_by_status
)
from model.admin.get_total_user import get_total_users, get_users_role
from collections import OrderedDict

def status_cycle_mapper():
    for_review = get_documents_count_by_status("for_review")
    under_review = get_documents_count_by_status("under_review")
    revisions = get_documents_count_by_status("for_revision")
    approval = get_documents_count_by_status("for_approval")
    completed = get_documents_count_by_status("approved")
    rejected = get_documents_count_by_status("rejected")
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
    total_implementors = get_users_role("implementor")
    total_reviewers = get_users_role("reviewer")
    total_documents = get_documents_count()
    data = [
        { f"label": "Total Implementors", "value": total_implementors},
        { f"label": "Total Reviewers", "value": total_reviewers},
        { f"label": "Total Documents", "value": total_documents},
    ];
    return data

def pie_data_mapper():
    total_implementors = get_users_role("implementor")
    total_reviewers = get_users_role("reviewer")
    total = get_total_users()
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
        "revision": "Revisions",
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
