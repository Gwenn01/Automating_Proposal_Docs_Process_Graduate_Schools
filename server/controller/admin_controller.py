from controller.mapper.admin_overview_mapper import (
    status_cycle_mapper, 
    static_cards_mapper,
    pie_data_mapper,
    bar_data_mapper,
)
from model.admin.get_total_documents import get_monthly_document_status_counts
from flask import jsonify

def get_overview_data_controller():
    data = {}
    data['status_cycle'] = status_cycle_mapper()
    data['static_cards'] = static_cards_mapper()
    data['pie_data'] = pie_data_mapper()
    rows = get_monthly_document_status_counts()
    data["bar_data"] = bar_data_mapper(rows)
    
    print(type(data['status_cycle']), data['status_cycle'])
    print(type(data['static_cards']), data['static_cards'])
    print(type(data['pie_data']), data['pie_data'])
    print(type(data['bar_data']), data['bar_data'])

    
    try:
        return jsonify(data), 200
    except Exception as e:
        return {"error": str(e)}