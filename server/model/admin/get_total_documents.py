from database.connection import get_db_connection

def get_documents_count():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM proposals_docs")
    total_documents = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_documents

def get_all_documents():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM proposals_docs")
    total_documents = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_documents

def get_documents_by_status(status):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM proposals_docs WHERE status=?", (status,))
    total_documents = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return total_documents
