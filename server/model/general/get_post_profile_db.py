from utils.execute_query import execute_query

def get_profile(user_id):
    try:
        ...
        query = """
            SELECT * 
            FROM users u 
            LEFT JOIN implementor_info i 
                ON u.user_id = i.user_id
            WHERE u.user_id = %s
        """
        params = (user_id,)
        result = execute_query(query, params, True)
        return result
    except Exception as e:
        print(e)
        return None
    
def put_profile_implementor(user_id, fullname, email, password, campus, department, position):
    try:
        query = """
            UPDATE users u
            LEFT JOIN implementor_info i 
                ON u.user_id = i.user_id
            SET 
                u.fullname = %s,
                u.email = %s,
                u.password = %s,
                i.campus = %s,
                i.department = %s,
                i.position = %s
            WHERE u.user_id = %s
        """
        params = (fullname, email, password, campus, department, position, user_id)
        return execute_query(query, params) == 1
    except Exception as e:
        print(e)
        return False

        
def put_profile_reviewer(user_id, fullname, email, password):
    try:
        query = """
            UPDATE users
            SET fullname = %s,
                email = %s,
                password = %s
            WHERE user_id = %s
        """
        params = (fullname, email, password, user_id)
        return execute_query(query, params) == 1
    except Exception as e:
        print(e)
        return False
