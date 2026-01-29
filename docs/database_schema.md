# Database Schema

## Overview
The database is a PostgreSQL relational database. The schema is designed to support the LETHCON platform's requirements for user management, learning paths, challenges, lab sessions, payments, and certifications.

## Tables

### Users
Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the user. |
| email | VARCHAR(255) | User's email address (unique). |
| username | VARCHAR(100) | User's chosen username (unique). |
| password_hash | VARCHAR(255) | Hashed password. |
| role | ENUM('Learner', 'PremiumUser', 'Instructor', 'Admin') | User's role. |
| subscription_tier | ENUM('Free', 'Basic', 'Premium') | User's subscription tier. |
| status | ENUM('Active', 'Suspended', 'Deleted') | Account status. |
| created_at | TIMESTAMP | Account creation timestamp. |
| updated_at | TIMESTAMP | Last update timestamp. |

### LearningPaths
Stores learning path definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the learning path. |
| title | VARCHAR(255) | Title of the learning path. |
| description | TEXT | Description of the learning path. |
| category | ENUM('Network Security', 'Web Security', 'Cryptography', 'Forensics', etc.) | Category of the learning path. |
| difficulty | ENUM('Beginner', 'Intermediate', 'Advanced') | Difficulty level. |
| estimated_duration | INTEGER | Estimated time to complete (in hours). |
| is_public | BOOLEAN | Whether the path is publicly available. |
| created_at | TIMESTAMP | Creation timestamp. |
| updated_at | TIMESTAMP | Last update timestamp. |

### Modules
Stores modules within a learning path.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the module. |
| learning_path_id | UUID (Foreign Key) | Reference to the learning path. |
| title | VARCHAR(255) | Title of the module. |
| description | TEXT | Description of the module. |
| order | INTEGER | Order of the module within the path. |
| prerequisites | UUID[] (Array of UUIDs) | List of module IDs that must be completed before this module. |
| created_at | TIMESTAMP | Creation timestamp. |
| updated_at | TIMESTAMP | Last update timestamp. |

### Challenges
Stores CTF challenges within a module.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the challenge. |
| module_id | UUID (Foreign Key) | Reference to the module. |
| title | VARCHAR(255) | Title of the challenge. |
| description | TEXT | Description of the challenge. |
| difficulty | ENUM('Easy', 'Medium', 'Hard') | Difficulty level. |
| points | INTEGER | Points awarded for solving the challenge. |
| docker_image | VARCHAR(255) | Docker image for the lab environment. |
| flag | VARCHAR(255) (Encrypted) | The correct flag for the challenge. |
| hints | TEXT[] (Array of texts) | List of hints for the challenge. |
| created_at | TIMESTAMP | Creation timestamp. |
| updated_at | TIMESTAMP | Last update timestamp. |

### LabSessions
Stores active lab sessions for users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the lab session. |
| user_id | UUID (Foreign Key) | Reference to the user. |
| challenge_id | UUID (Foreign Key) | Reference to the challenge. |
| container_id | VARCHAR(255) | Docker container ID. |
| start_time | TIMESTAMP | Session start time. |
| end_time | TIMESTAMP | Session end time (if terminated). |
| status | ENUM('Requested', 'Provisioning', 'Active', 'Terminated') | Current status of the lab session. |
| created_at | TIMESTAMP | Creation timestamp. |

### Submissions
Stores flag submissions by users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the submission. |
| user_id | UUID (Foreign Key) | Reference to the user. |
| challenge_id | UUID (Foreign Key) | Reference to the challenge. |
| flag | VARCHAR(255) | The flag submitted by the user. |
| is_correct | BOOLEAN | Whether the flag is correct. |
| submitted_at | TIMESTAMP | Submission timestamp. |

### Progress
Tracks user progress through modules and challenges.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the progress record. |
| user_id | UUID (Foreign Key) | Reference to the user. |
| module_id | UUID (Foreign Key) | Reference to the module. |
| challenge_id | UUID (Foreign Key) | Reference to the challenge (if applicable). |
| status | ENUM('Not Started', 'In Progress', 'Completed') | Progress status. |
| score | FLOAT | Score achieved (if applicable). |
| completed_at | TIMESTAMP | Completion timestamp (if completed). |
| updated_at | TIMESTAMP | Last update timestamp. |

### Payments
Stores payment transactions for subscriptions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the payment. |
| user_id | UUID (Foreign Key) | Reference to the user. |
| amount | DECIMAL(10,2) | Amount paid. |
| currency | VARCHAR(3) | Currency code (e.g., ETB, USD). |
| payment_method | ENUM('Telebirr', 'CBE Birr', 'Card', 'Other') | Payment method used. |
| transaction_id | VARCHAR(255) | Transaction ID from the payment gateway. |
| status | ENUM('Pending', 'Completed', 'Failed', 'Refunded') | Payment status. |
| created_at | TIMESTAMP | Payment creation timestamp. |

### Certificates
Stores certificates awarded to users.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (Primary Key) | Unique identifier for the certificate. |
| user_id | UUID (Foreign Key) | Reference to the user. |
| learning_path_id | UUID (Foreign Key) | Reference to the learning path. |
| issued_at | TIMESTAMP | Date and time the certificate was issued. |
| certificate_url | VARCHAR(255) | URL to the downloadable certificate. |

## Relationships
- One **User** can have many **LabSessions**, **Submissions**, **Progress** records, **Payments**, and **Certificates**.
- One **LearningPath** can have many **Modules**.
- One **Module** can have many **Challenges** and is part of one **LearningPath**.
- One **Challenge** can have many **LabSessions** and **Submissions**, and belongs to one **Module**.
- **Progress** is a junction table that links **User**, **Module**, and optionally **Challenge**.

## Indexes
Indexes are created on foreign key columns and frequently queried columns (e.g., user_id, challenge_id, status) to improve query performance.
