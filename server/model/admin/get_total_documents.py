from database.connection import get_db_connection

def get_all_documents():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM proposals_docs")
    total_documents = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_documents

from database.connection import get_db_connection

def get_all_documents_with_user():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT DISTINCT
            p.proposal_id,
            p.title,
            p.file_path,
            p.status,
            p.submission_date,

            u.user_id,
            u.fullname,
            u.email,
            u.role
        FROM proposals_docs p
        LEFT JOIN users u ON p.user_id = u.user_id
        ORDER BY p.submission_date DESC
    """

    cursor.execute(query)
    documents = cursor.fetchall()

    cursor.close()
    conn.close()

    return documents

def get_documents_count():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM proposals_docs")
    total_documents = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_documents

def get_documents_count_by_status(status):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM proposals_docs WHERE status = %s",
        (status,)
    )

    total_documents = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_documents

def get_monthly_document_status_counts():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
       SELECT
            YEAR(submission_date) AS year,
            MONTH(submission_date) AS month_num,
            DATE_FORMAT(submission_date, '%b') AS month_name,
            status,
            COUNT(*) AS total
        FROM proposals_docs
        WHERE submission_date >= DATE_SUB(
            DATE_FORMAT(CURDATE(), '%Y-%m-01'),
            INTERVAL 3 MONTH
        )
        GROUP BY year, month_num, status
        ORDER BY year, month_num;
    """)

    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

