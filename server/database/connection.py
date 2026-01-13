import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="bzenxtewg8yce5bnidpx-mysql.services.clever-cloud.com",
        user="ucayuca9rs952tf9",
        password="rO8hOxk7JmLQgq1jth6G",
        database="bzenxtewg8yce5bnidpx"
    )
