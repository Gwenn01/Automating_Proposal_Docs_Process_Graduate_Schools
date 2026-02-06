from model.general.insert_notification import insert_notification_db
from model.general.get_review_deadline import get_review_deadline_db
from model.general.check_notification import check_notification
from datetime import datetime

def format_review_data(data):
    formatted = []

    for r in data:
        days_left = (r["review_deadline"] - datetime.now()).days
        title = r["title"]
        if days_left < 0:
            continue

        formatted.append({
            "user_id": r["user_id"],
            "days_left": days_left,
            "title": title,
        })

    return formatted

def process_review_deadline():
    try:
        data = get_review_deadline_db()
        if not data:
            return

        formatted_data = format_review_data(data)

        for r in formatted_data:
            already_notified = bool(check_notification(r["user_id"]))
            if already_notified:
                continue

            insert_notification_db(
                r["user_id"],
                f"You have {r['days_left']} day(s) remaining to review the task titled '{r['title']}'."
            )
    except Exception as e:
        print(e)
