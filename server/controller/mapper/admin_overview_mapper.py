from model.admin.get_total_documents import (
    get_total_documents
)
from model.admin.get_total_user import get_total_users, get_users_role
def status_cycle_mapper():
    
    data = [
    { "label": "Under Reviews", "value": "24" },
    { "label": "Completed", "value": "24"},
    { "label": "Rejected",  "value": "24"},
    { "label": "Revisions", "value": "24"},
  ];