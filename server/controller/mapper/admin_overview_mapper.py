from model.admin.get_total_documents import (
    get_documents_count,
    get_documents_count_by_status
)
from model.admin.get_total_user import get_total_users, get_users_role
from collections import OrderedDict

def status_cycle_mapper():
    under_review = get_documents_count_by_status("under_review")
    completed = get_documents_count_by_status("approved")
    rejected = get_documents_count_by_status("rejected")
    revisions = get_documents_count_by_status("for_revision")
    data = [
        { f"label": "Under Reviews", "value": under_review },
        { f"label": "Completed", "value": completed },
        { f"label": "Rejected",  "value": rejected },
        { f"label": "Revisions", "value": revisions },
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

    for r in rows:
        key = f"{r['year']}-{r['month_num']:02d}"

        if key not in months:
            months[key] = {
                "name": r["month_name"],
                "Revisions": 0,
                "Completed": 0,
                "Rejected": 0,
                "UnderReview": 0
            }

        if r["status"] == "revision":
            months[key]["Revisions"] = r["total"]
        elif r["status"] == "completed":
            months[key]["Completed"] = r["total"]
        elif r["status"] == "rejected":
            months[key]["Rejected"] = r["total"]
        elif r["status"] == "under_review":
            months[key]["UnderReview"] = r["total"]

    return list(months.values())
