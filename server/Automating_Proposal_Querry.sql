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
SELECT * FROM notifications;

ALTER TABLE proposal_reviews
MODIFY review_deadline DATETIME
DEFAULT (DATE_ADD(NOW(), INTERVAL 7 DAY));

DELETE FROM proposal_review_items WHERE review_item_id = 23;

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DELETE FROM proposal_review_items WHERE review_item_id >= 22;

DELETE FROM notifications WHERE id = 17;

ALTER TABLE proposals_docs
ADD review_deadline DATETIME,
ADD is_expired TINYINT DEFAULT 0;


UPDATE proposal_reviews
SET decision = 'pending'
WHERE review_id = 51;

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

UPDATE proposal_content
SET
    proposal_id = 2,
    program_title = 'Resolution No. 1436, s. 2025',
    project_title = 'Integrated Coastal Resource Management and Livelihood Project',
    activity_title = 'Mangrove Rehabilitation and Crab Farming Workshop',
    sdg_alignment = 'Goal 1: No Poverty; Goal 13: Climate Action; Goal 14: Life Below Water',
    extension_agenda = 'Environmental Sustainability and Economic Empowerment',
    project_leader = 'Juan Dela Cruz, Ph.D.',
    members = 'Maria Santos, MSc (Bio); Engr. Pedro Reyes; Ana Lim (Admin)',
    college_campus_program = 'College of Agriculture and Forestry - Iba Campus',
    collaborating_agencies = 'Department of Environment and Natural Resources (DENR) - Zambales; LGU Iba',
    community_location = 'Barangay Sto. Rosario, Iba, Zambales',
    target_sector = 'Registered Fisherfolk Association of Iba',
    number_of_beneficiaries = 50,
    implementation_period = 'August 2025 - August 2027 (2 Years)',
    total_budget_requested = 150000.00,
    rationale = 'Based on the needs assessment conducted in July 2025, the local fisherfolk reported a 30% decline in daily catch due to mangrove degradation. This project addresses both environmental restoration and alternative livelihood needs.',
    significance = 'Restoring the mangrove area provides a natural nursery for fish, directly improving catch rates. Simultaneously, the crab farming component offers an immediate alternative income source during the lean season.',
    general_objectives = 'To restore 2 hectares of mangrove forest and establish a sustainable mud crab farming livelihood program for 50 fisherfolk families.',
    specific_objectives = '1. Plant 5,000 mangrove seedlings by Q4 2025. 2. Train 50 beneficiaries in mud crab fattening techniques. 3. Establish a community-based monitoring team.',
    methodology = 'Phase 1: Community Mobilization and Site Assessment. Phase 2: Capacity Building (Training Workshop). Phase 3: Implementation (Planting and Stocking). Phase 4: Monitoring and Evaluation.',
    expected_output_6ps = '{"publications": "1 Training Manual on Mud Crab Farming", "patents": "N/A", "products": "2 Hectares Reforested Mangrove", "people_services": "50 Trained Fisherfolk", "places_partnerships": "MOA with LGU Iba", "policy": "Barangay Resolution on Mangrove Protection"}',
    sustainability_plan = 'A ''Green Fund'' will be established where 10% of the crab farming income will be reinvested into mangrove maintenance and future seedling procurement.',
    org_and_staffing_json = '[{"activity":"Project Management","person":"Juan Dela Cruz","tor":"Overall supervision and reporting"},{"activity":"Technical Training","person":"Maria Santos","tor":"Module development and lecture"},{"activity":"Logistics","person":"Ana Lim","tor":"Procurement of supplies and food"}]',
    activity_schedule_json = '[{"time":"07:30-08:00 AM","activity":"Registration"},{"time":"08:00-08:30 AM","activity":"Opening Program"},{"time":"09:00-12:00 PM","activity":"Lecture: Mangrove Ecology"},{"time":"01:00-04:00 PM","activity":"Workshop: Crab Fattening Techniques"}]',
    budget_breakdown_json = '{"meals":{"am_snacks":3750,"lunch":7500,"pm_snacks":3750},"supplies":{"seedlings":50000,"crab_crablets":30000,"nets_and_ropes":15000},"transportation":5000,"total_requested":115000}',
    prmsu_participants_count = 5,
    partner_agency_participants_count = 3,
    trainees_count = 50
WHERE content_id = 2;

UPDATE proposal_content AS target
JOIN proposal_content AS source
  ON source.proposal_id = 1
SET
  target.board_resolution_title = source.board_resolution_title,
  target.board_resolution_no = source.board_resolution_no,
  target.project_title = source.project_title,
  target.activity_title = source.activity_title,
  target.sdg_goals = source.sdg_goals,
  target.project_theme = source.project_theme,
  target.project_leader = source.project_leader,
  target.project_staff = source.project_staff,
  target.college = source.college,
  target.partner_agencies = source.partner_agencies,
  target.project_location = source.project_location,
  target.beneficiaries = source.beneficiaries,
  target.no_of_beneficiaries = source.no_of_beneficiaries,
  target.project_duration = source.project_duration,
  target.total_budget = source.total_budget,
  target.rationale = source.rationale,
  target.significance = source.significance,
  target.general_objective = source.general_objective,
  target.specific_objectives = source.specific_objectives,
  target.methodology = source.methodology,
  target.sustainability_plan = source.sustainability_plan,
  target.implementation_matrix = source.implementation_matrix,
  target.activity_schedule = source.activity_schedule,
  target.budget_breakdown = source.budget_breakdown,
  target.expected_outputs = source.expected_outputs
WHERE target.proposal_id = 2;


DESCRIBE proposal_content;

UPDATE proposal_content AS target
JOIN proposal_content AS source
  ON source.proposal_id = 1
SET
  target.program_title           = source.program_title,
  target.project_title           = source.project_title,
  target.activity_title          = source.activity_title,
  target.sdg_alignment           = source.sdg_alignment,
  target.extension_agenda        = source.extension_agenda,
  target.project_leader          = source.project_leader,
  target.members                 = source.members,
  target.college_campus_program  = source.college_campus_program,
  target.collaborating_agencies  = source.collaborating_agencies,
  target.community_location      = source.community_location,
  target.target_sector           = source.target_sector,
  target.number_of_beneficiaries = source.number_of_beneficiaries,
  target.implementation_period   = source.implementation_period,
  target.total_budget_requested  = source.total_budget_requested,
  target.rationale               = source.rationale,
  target.significance            = source.significance,
  target.general_objectives      = source.general_objectives,
  target.specific_objectives     = source.specific_objectives,
  target.methodology             = source.methodology,
  target.sustainability_plan     = source.sustainability_plan,
  target.org_and_staffing_json   = source.org_and_staffing_json,
  target.activity_schedule_json  = source.activity_schedule_json,
  target.budget_breakdown_json   = source.budget_breakdown_json,
  target.prmsu_participants_count = source.prmsu_participants_count,
  target.partner_agency_participation = source.partner_agency_participation,
  target.trainees_count          = source.trainees_count,
  target.expected_output_6ps     = source.expected_output_6ps
WHERE target.proposal_id = 2;

SELECT proposal_id, project_title, activity_title
FROM proposal_content
WHERE proposal_id IN (1, 2);
UPDATE proposal_content AS target
JOIN proposal_content AS source
  ON source.proposal_id = 1
SET
  target.activity_title = source.activity_title
WHERE target.proposal_id = 2;

UPDATE proposal_content
SET
  members = JSON_ARRAY(
    'Maria Santos',
    'MSc (Biology)',
    'Engr. Pedro Reyes',
    'Ana Lim (Admin)'
  ),
  collaborating_agencies = JSON_ARRAY(
    'DENR - Zambales',
    'LGU Iba'
  )
WHERE proposal_id = 2;

UPDATE proposal_content
SET
  program_title = 'Resolution No. 1452, s. 2025',
  project_title = 'Sustainable Aquaculture and Coastal Resilience Program',
  activity_title = 'Seaweed Farming and Coastal Cleanup Training',

  sdg_alignment = 'Goal 1: No Poverty; Goal 8: Decent Work; Goal 14: Life Below Water',
  extension_agenda = 'Coastal Sustainability and Livelihood Development',

  project_leader = 'Dr. Elena Ramos',
  members = 'Carlos Mendoza; Liza Perez; Engr. Ramon Cruz',

  college_campus_program = 'College of Fisheries - Masinloc Campus',
  collaborating_agencies = 'BFAR Region III; LGU Masinloc',

  community_location = 'Barangay San Lorenzo, Masinloc, Zambales',
  target_sector = 'Small-scale Fisherfolk and Women Associations',

  number_of_beneficiaries = 40,
  implementation_period = 'September 2025 - September 2026',
  total_budget_requested = 120000.00,

  rationale = 'The community identified declining fish stocks and improper waste disposal as major challenges. Seaweed farming was identified as a viable alternative livelihood.',
  significance = 'The project provides supplemental income while promoting environmental protection and coastal cleanliness.',

  general_objectives = 'To establish a sustainable seaweed farming livelihood and improve coastal environmental practices.',
  specific_objectives = '1. Train 40 beneficiaries on seaweed farming. 2. Establish pilot seaweed farms. 3. Conduct quarterly coastal cleanups.',

  methodology = 'Community orientation, technical training, pilot implementation, and continuous monitoring.',

  sustainability_plan = 'Beneficiaries will form a cooperative and allocate 10% of profits for farm expansion and maintenance.',

  org_and_staffing_json = '[
    {"activity":"Project Management","person":"Dr. Elena Ramos","tor":"Overall coordination"},
    {"activity":"Technical Training","person":"Carlos Mendoza","tor":"Seaweed farming instruction"},
    {"activity":"Community Liaison","person":"Liza Perez","tor":"Beneficiary coordination"}
  ]',

  activity_schedule_json = '[
    {"time":"08:00-09:00 AM","activity":"Orientation"},
    {"time":"09:00-12:00 PM","activity":"Lecture: Seaweed Farming"},
    {"time":"01:00-04:00 PM","activity":"Hands-on Demonstration"}
  ]',

  budget_breakdown_json = '{
    "meals":{"snacks":6000,"lunch":12000},
    "supplies":{"seaweed_lines":35000,"seedlings":25000},
    "transportation":7000,
    "total_requested":120000
  }',

  prmsu_participants_count = 4,
  partner_agency_participants_count = 2,
  trainees_count = 40,

  expected_output_6ps = '{
    "publications":"Training Guide on Seaweed Farming",
    "patents":"N/A",
    "products":"Pilot Seaweed Farms",
    "people_services":"40 Trained Beneficiaries",
    "places_partnerships":"MOA with LGU Masinloc",
    "policy":"Barangay Coastal Protection Resolution"
  }'

WHERE proposal_id = 2;
SELECT proposal_id
FROM proposals_docs
WHERE proposal_id = 4;

