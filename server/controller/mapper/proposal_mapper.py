from datetime import datetime
from textwrap import dedent

def implementor_view_proposal_mapper(fetch_user_proposals):
    if not fetch_user_proposals:
        return {}
    data = []
    for f in fetch_user_proposals:
        if f["reviewer_count"] == 0:
            reviews_text = "No reviews yet"
        else:
            reviews_text = f'{f["reviewed_count"]} out {f["reviewer_count"]}'

        data.append({
            "title": f["title"],
            "submitted_at": f["submission_date"],
            "status": f["status"],
            "reviews": reviews_text
        })

    return data


def view_cover_page_mapper(cover):
    cover = cover[0]
    submission_date = cover["submission_date"].strftime("%B %d, %Y")

    return dedent(f"""
    {submission_date}

    DR. ROY N. VILLALOBOS
    University President
    President Ramon Magsaysay State University

    Dear Sir:

    I have the honor to submit the proposal for your consideration and appropriate action for the
    proposed extension program entitled {cover["board_resolution_title"]}, with the approved budget
    of {cover["approved_budget_words"]} (Php {cover["approved_budget_amount"]:,.2f}), with the duration
    of {cover["duration_words"]} ({cover["duration_years"]}) year(s), covering the period
    {cover["date_from_to"]}, as approved under {cover["board_resolution_no"]}.

    This program includes an activity entitled {cover["activity_title"]}, to be conducted on
    {cover["activity_date"]} at {cover["activity_venue"]}. This activity is valuable as it aims to
    {cover["activity_value_statement"]}. The requested expenses for this activity from the university
    amount to Php {cover["requested_activity_budget"]:,.2f}, which will be used to defray expenses for
    food, transportation, supplies and materials, and other expenses related to the activity.

    Further, there will be {cover["prmsu_participants_words"]} ({cover["prmsu_participants_num"]})
    participants from PRMSU, {cover["partner_agency_participants_words"]}
    ({cover["partner_agency_participants_num"]}) participants from the collaborating agency,
    {cover["partner_agency_name"]}, and {cover["trainees_words"]} ({cover["trainees_num"]}) trainees
    from the abovementioned community.

    Your favorable response regarding this matter will be highly appreciated.

    Prepared by:

    __________________________
    Proponent

    Noted by:

    __________________________
    College Dean

    Endorsed by:

    KATHERINE M. UY, MAEd
    Director, Extension Services

    Recommending Approval:                        Certified Funds Available:

    MARLON JAMES A. DEDICATORIA, Ph.D.            ROBERTO C. BRIONES JR., CPA
    Vice-President, Research and Development     University Accountant IV

    Approved by:

    ROY N. VILLALOBOS, DPA
    University President
    """).strip()
