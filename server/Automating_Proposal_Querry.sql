SHOW DATABASES;

SELECT 1;
USE bzenxtewg8yce5bnidpx;

SELECT * FROM users;
SELECT * FROM instructors_info;
SELECT * FROM proposals_docs;
SELECT * FROM proposal_cover_page;
SELECT * FROM proposal_content;
SELECT * FROM proposal_reviews;
SELECT * FROM proposal_review_items;
SELECT * FROM proposal_assignments;
SELECT * FROM proposal_revisions;
SELECT * FROM  office_checks;
SELECT * FROM  proposal_status_history;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('instructor', 'reviewer', 'admin') NOT NULL
);
ALTER TABLE users
MODIFY COLUMN role ENUM('instructor', 'implementor', 'reviewer', 'admin') NOT NULL;
UPDATE users
SET role = 'implementor'
WHERE user_id IN (
    SELECT user_id
    FROM (
        SELECT user_id
        FROM users
        WHERE role = 'instructor'
    ) AS temp
);
ALTER TABLE users
MODIFY COLUMN role ENUM('implementor', 'reviewer', 'admin') NOT NULL;


CREATE TABLE implementor_info (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    campus VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_instructor_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
RENAME TABLE instructors_info TO implementor_info;



CREATE TABLE proposals_docs (
    proposal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NULL,
    status ENUM('rejected', 'under_review', 'for_revision', 'approved') DEFAULT 'under_review',
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
ALTER TABLE proposals_docs
MODIFY COLUMN file_path VARCHAR(255) NULL;
ALTER TABLE proposal_cover_page ADD UNIQUE (proposal_id);
ALTER TABLE proposal_content ADD UNIQUE (proposal_id);

ALTER TABLE proposals_docs
ADD COLUMN reviewer_count INT NOT NULL DEFAULT 0 AFTER status,
ADD COLUMN reviewed_count INT NOT NULL DEFAULT 0 AFTER reviewer_count;



CREATE TABLE proposal_cover_page (
    cover_id INT AUTO_INCREMENT PRIMARY KEY,
    proposal_id INT NOT NULL,
    submission_date DATE, -- [cite: 1]

    -- Program Details from Paragraph 1
    board_resolution_title TEXT, -- (Title referring to approved Board Reso) [cite: 6]
    board_resolution_no VARCHAR(100) DEFAULT 'Resolution No. 1436, s. 2025', 
    approved_budget_words TEXT, -- (Total amount in words) [cite: 6]
    approved_budget_amount DECIMAL(15, 2), -- (Total amount in numbers) [cite: 7]
    duration_words VARCHAR(255), -- duration of ____ in words [cite: 7]
    duration_years INT, -- (in numbers) [cite: 7]
    date_from_to VARCHAR(100), -- (date from-to) [cite: 7]
    
    -- Activity Details from Paragraph 2
    activity_title VARCHAR(255), -- (activity title under the program) [cite: 9]
    activity_date VARCHAR(100), -- on ___date [cite: 9]
    activity_venue VARCHAR(255), -- at___ venue [cite: 9]
    activity_value_statement TEXT, -- This activity is valuable ____ for what [cite: 10]
    requested_activity_budget DECIMAL(15, 2), -- requested expenses ... Php ____ [cite: 10]
    
    -- Participant Counts from Paragraph 3
    prmsu_participants_words VARCHAR(255), -- number of participants in words [cite: 11]
    prmsu_participants_num INT, -- (number of participants in numbers) [cite: 11]
    partner_agency_participants_words VARCHAR(255), -- total number from partner agency in words [cite: 11]
    partner_agency_participants_num INT, -- (total number from partner agency in numbers) [cite: 11]
    partner_agency_name VARCHAR(255), -- (agency name) [cite: 11]
    trainees_words VARCHAR(255), -- total number of trainees in words [cite: 11]
    trainees_num INT, -- (total number of trainees in numbers) [cite: 11]
	
    FOREIGN KEY (proposal_id) REFERENCES proposals_docs(proposal_id) ON DELETE CASCADE
);

CREATE TABLE proposal_content (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    proposal_id INT NOT NULL,
    
    -- I. PROJECT PROFILE [cite: 27]
    program_title VARCHAR(255), -- Must align with Board Reso No. 1436, s. 2025
    project_title VARCHAR(255),
    activity_title VARCHAR(255),
    sdg_alignment TEXT, -- Links to Sustainable Development Goals
    extension_agenda TEXT,
    project_leader VARCHAR(255),
    members TEXT,
    college_campus_program VARCHAR(255),
    collaborating_agencies VARCHAR(255),
    community_location VARCHAR(255),
    target_sector VARCHAR(255),
    number_of_beneficiaries INT,
    implementation_period VARCHAR(100), -- Duration (in years/dates) [cite: 7]
    total_budget_requested DECIMAL(15, 2), -- From cover letter 

    -- II - IV. NARRATIVE SECTIONS [cite: 27]
    rationale TEXT,
    significance TEXT,
    general_objectives TEXT,
    specific_objectives TEXT,

    -- V - VI. METHODOLOGY & OUTPUTS [cite: 27]
    methodology json,
    expected_output_6ps TEXT, -- Publications, Patents, Products, etc.
      -- Vsocial_impact TEXT,
      -- Veconomic_impact TEXT,

    -- VII - VIII. SUSTAINABILITY & STAFFING [cite: 28, 29]
    sustainability_plan TEXT,
    org_and_staffing_json JSON, -- Stores names, designations, and TORs 

    -- IX. PLAN OF ACTIVITIES [cite: 31, 32]
    activity_schedule_json JSON, -- Stores the timeline (Registration, Lectures, etc.)

    -- XI. BUDGETARY REQUIREMENTS [cite: 33, 34]
    budget_breakdown_json JSON, -- Detailed items (Meals, Supplies, Transpo)
    
    -- PARTICIPANT BREAKDOWN 
    prmsu_participants_count INT,
    partner_agency_participants_count INT,
    trainees_count INT,

    FOREIGN KEY (proposal_id) REFERENCES proposals_docs(proposal_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
ALTER TABLE proposal_content
DROP COLUMN expected_output_6ps,
ADD COLUMN expected_output_6ps JSON;
ALTER TABLE proposal_content
DROP COLUMN social_impact,
DROP COLUMN economic_impact;



CREATE TABLE proposal_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    proposal_id INT NOT NULL,
    user_id INT NOT NULL,
    comments TEXT,
    decision ENUM('needs_revision', 'approved') NOT NULL,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (proposal_id) REFERENCES  proposals_docs(proposal_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE proposal_reviews
MODIFY decision ENUM('pending', 'needs_revision', 'approved')
NOT NULL DEFAULT 'pending';

DROP TABLE IF EXISTS proposal_review_items;

CREATE TABLE proposal_review_items (
    review_item_id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    review_round VARCHAR(10) DEFAULT '1st', -- 1st, 2nd, or 3rd review 
    proposal_type VARCHAR(20), -- Program, Project, or Activity 
    source_of_fund TEXT, -- Resolution No. 1436, S. 2025 
    cover_letter_feedback TEXT, 
    form1_proposal_feedback TEXT,
    project_profile_feedback TEXT,
    rationale_feedback TEXT, -- Includes needs assessment 
    significance_feedback TEXT,
    general_objectives_feedback TEXT,
    specific_objectives_feedback TEXT,
    methodology_feedback TEXT,
    expected_output_feedback TEXT,
    potential_impact_feedback TEXT,
    sustainability_plan_feedback TEXT,
    org_staffing_feedback TEXT,
    work_financial_plan_feedback TEXT,
    budget_summary_feedback TEXT,
    attachment_availability_json JSON,
    FOREIGN KEY (review_id) REFERENCES proposal_reviews(review_id) ON DELETE CASCADE
);

CREATE TABLE proposal_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,

    proposal_id INT NOT NULL,
    user_id INT NOT NULL,
    review_id INT NOT NULL,

    version_no INT NOT NULL,
	
    remarks TEXT NULL,

    -- Foreign Keys
    CONSTRAINT fk_proposal_history_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_proposal_history_proposal
        FOREIGN KEY (proposal_id)
        REFERENCES proposals_docs(proposal_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
ALTER TABLE proposal_history
DROP FOREIGN KEY fk_proposal_history_review;

ALTER TABLE proposal_history
DROP COLUMN review_id;

ALTER TABLE proposal_history
DROP INDEX uq_proposal_history_version,
ADD CONSTRAINT uq_ph_proposal_version UNIQUE (proposal_id, version_no);

CREATE TABLE proposal_cover_page_history (
    cover_history_id INT AUTO_INCREMENT PRIMARY KEY,
    history_id INT NOT NULL,

    submission_date DATE,

    -- Program Details
    board_resolution_title TEXT,
    board_resolution_no VARCHAR(100),
    approved_budget_words TEXT,
    approved_budget_amount DECIMAL(15, 2),
    duration_words VARCHAR(255),
    duration_years INT,
    date_from_to VARCHAR(100),

    -- Activity Details
    activity_title VARCHAR(255),
    activity_date VARCHAR(100),
    activity_venue VARCHAR(255),
    activity_value_statement TEXT,
    requested_activity_budget DECIMAL(15, 2),

    -- Participant Counts
    prmsu_participants_words VARCHAR(255),
    prmsu_participants_num INT,
    partner_agency_participants_words VARCHAR(255),
    partner_agency_participants_num INT,
    partner_agency_name VARCHAR(255),
    trainees_words VARCHAR(255),
    trainees_num INT,

    CONSTRAINT fk_cover_history_history
        FOREIGN KEY (history_id)
        REFERENCES proposal_history(history_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE proposal_content_history (
    content_history_id INT AUTO_INCREMENT PRIMARY KEY,
    history_id INT NOT NULL,

    -- I. PROJECT PROFILE
    program_title VARCHAR(255),
    project_title VARCHAR(255),
    activity_title VARCHAR(255),
    sdg_alignment TEXT,
    extension_agenda TEXT,
    project_leader VARCHAR(255),
    members TEXT,
    college_campus_program VARCHAR(255),
    collaborating_agencies VARCHAR(255),
    community_location VARCHAR(255),
    target_sector VARCHAR(255),
    number_of_beneficiaries INT,
    implementation_period VARCHAR(100),
    total_budget_requested DECIMAL(15, 2),

    -- II – IV. NARRATIVE
    rationale TEXT,
    significance TEXT,
    general_objectives TEXT,
    specific_objectives TEXT,

    -- V – VI. METHODOLOGY & OUTPUTS
    methodology JSON,
    expected_output_6ps JSON,

    -- VII – VIII. SUSTAINABILITY & STAFFING
    sustainability_plan TEXT,
    org_and_staffing_json JSON,

    -- IX. PLAN OF ACTIVITIES
    activity_schedule_json JSON,

    -- XI. BUDGETARY REQUIREMENTS
    budget_breakdown_json JSON,

    -- PARTICIPANT BREAKDOWN
    prmsu_participants_count INT,
    partner_agency_participants_count INT,
    trainees_count INT,

    CONSTRAINT fk_content_history_history
        FOREIGN KEY (history_id)
        REFERENCES proposal_history(history_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE proposal_review_history (
    review_history_id INT AUTO_INCREMENT PRIMARY KEY,
    history_id INT NOT NULL,          -- links to proposal_history
    user_id INT NOT NULL,             -- reviewer
    review_round VARCHAR(10),          -- 1st, 2nd, 3rd
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_prh_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_prh_proposal_history
        FOREIGN KEY (history_id)
        REFERENCES proposal_history(history_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE proposal_review_items_history (
    review_item_history_id INT AUTO_INCREMENT PRIMARY KEY,
    review_history_id INT NOT NULL,

    proposal_type VARCHAR(20),
    source_of_fund TEXT,
    cover_letter_feedback TEXT,
    form1_proposal_feedback TEXT,
    project_profile_feedback TEXT,
    rationale_feedback TEXT,
    significance_feedback TEXT,
    general_objectives_feedback TEXT,
    specific_objectives_feedback TEXT,
    methodology_feedback TEXT,
    expected_output_feedback TEXT,
    potential_impact_feedback TEXT,
    sustainability_plan_feedback TEXT,
    org_staffing_feedback TEXT,
    work_financial_plan_feedback TEXT,
    budget_summary_feedback TEXT,
    attachment_availability_json JSON,

    CONSTRAINT fk_prih_review_history
        FOREIGN KEY (review_history_id)
        REFERENCES proposal_review_history(review_history_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);





INSERT INTO users (fullname, email, password, role)
VALUES (
    'System Administrator',
    'admin@university.edu',
    'admin123',
    'admin'
);

INSERT INTO users (fullname, email, password, role)
VALUES (
    'Thesis Reviewer',
    'reviewer@university.edu',
    'reviewer',
    'reviewer'
);

INSERT INTO proposal_reviews 
(proposal_id, user_id, comments, decision)
VALUES
(1, 2, 'The proposal is well written but needs clarification on the budget section.', 'needs_revision'),
(1, 6, 'The proposal meets all requirements and is approved for implementation.', 'approved');

UPDATE proposals_docs
SET user_id = 3
WHERE proposal_id = 1;

UPDATE proposals_docs
SET status = "under_review"
WHERE proposal_id = 1;


ALTER TABLE proposals_docs
MODIFY status ENUM(
    'submitted',
    'under_review',
    'for_revision',
    'approved',
    'rejected',
    'for_review',
    'for_approval'
) DEFAULT 'for_review';

INSERT INTO proposal_assignments (assignment_id, reviewer_id, proposal_id)
VALUES (3, 6, 3);

ALTER TABLE users
ADD COLUMN is_deleted TINYINT(1) DEFAULT 0,
ADD COLUMN deleted_at DATETIME NULL;

ALTER TABLE proposals_docs
ADD COLUMN is_reviewed TINYINT(1) DEFAULT 0,
ADD COLUMN deleted_at DATETIME NULL;

DELETE FROM proposal_cover_page WHERE cover_id = 5;

ALTER TABLE proposal_reviews
DROP COLUMN comments;

SHOW DATABASES;
SHOW TABLES;

DROP TABLE proposal_assignments;

SELECT * FROM users;
SELECT * FROM implementor_info;
SELECT * FROM proposals_docs;
SELECT * FROM proposal_content;
SELECT * FROM proposal_cover_page;
SELECT * FROM proposal_reviews;
SELECT * FROM proposal_review_items;
SELECT * FROM proposal_history;
SELECT * FROM proposal_cover_page_history;
SELECT * FROM proposal_content_history;
SELECT * FROM proposal_review_history;
SELECT * FROM proposal_review_items_history;

DELETE FROM proposal_review_items WHERE review_item_id > 0;
UPDATE proposals_docs SET status = 'under_review' WHERE proposal_id = 2;
ALTER TABLE proposals_docs
ADD COLUMN last_edited_at DATETIME NULL after reviewed_count,
ADD COLUMN edit_version_count INT DEFAULT 0 after reviewed_count;

UPDATE proposals_docs SET edit_version_count = 0 where proposal_id = 2;
UPDATE proposals_docs SET reviewed_count = 1 WHERE proposal_id = 2;

DELETE from proposal_cover_page_history WHERE cover_history_id > 0;
DELETE from proposal_history WHERE history_id > 0;
DELETE FROM proposal_content_history WHERE content_history_id > 0;
DELETE FROM proposal_review_history WHERE review_history_id > 0;
DELETE FROM proposal_review_items_history WHERE review_item_history_id > 0;

DELETE FROM proposal_review_items WHERE review_item_id  = 14;
UPDATE proposals_docs SET status = "for_approval" WHERE proposal_id = 1;
UPDATE proposal_reviews SET is_reviewed = 1 WHERE review_id = 31;

UPDATE users SET fullname = "Kian Fontillas" WHERE user_id = 2;
DELETE FROM proposal_reviews WHERE review_id = 28;
DELETE FROM proposal_review_items WHERE review_item_id  = 9;
SET SQL_SAFE_UPDATES = 0;
-- 1. Delete child table first
DELETE FROM proposals_docs;
ALTER TABLE proposals_docs AUTO_INCREMENT = 1;

ALTER TABLE proposal_reviews ADD COLUMN is_reviewed bool default FALSE AFTER decision;


-- 2. Delete proposal content
DELETE FROM proposal_content;
ALTER TABLE proposal_content AUTO_INCREMENT = 1;

-- 3. Delete proposal cover (parent)
DELETE FROM proposal_cover_page;
ALTER TABLE proposal_cover_page AUTO_INCREMENT = 1;

SET SQL_SAFE_UPDATES = 1;

ALTER TABLE content
ADD COLUMN expected_output_6ps JSON After methodology;

ALTER TABLE proposal_reviews
ADD COLUMN review_date DATE After decision;

SELECT expected_output_6ps FROM proposal_content;

ALTER TABLE proposal_reviews
DROP COLUMN is_reassign;

SET FOREIGN_KEY_CHECKS = 0;

UPDATE proposals
SET proposal_id = 10
WHERE proposal_id = 1;

UPDATE proposal_content
SET proposal_id = 10
WHERE proposal_id = 1;

SET FOREIGN_KEY_CHECKS = 0;
UPDATE proposals_docs
SET user_id = 7
WHERE proposal_id = 1;



