# System Design

## Architectural Design
The LETHCON platform follows a microservices-oriented, layered architecture to achieve separation of concerns, scalability, and independent deployment of components. The high-level architecture decouples the user interface, business logic, data management, and lab orchestration services.

### Component Modeling
The system is component-based, grouping classes into reusable units. The main components are:

- **Web Client**: The frontend application built with React and Next.js.
- **API Gateway**: The entry point for all client requests, routing to appropriate microservices.
- **User Service**: Handles user authentication, profile management, and role-based access control.
- **Learning Service**: Manages learning paths, modules, and progress tracking.
- **Lab Orchestrator**: Provisions and manages containerized lab environments (Docker containers).
- **Payment Service**: Integrates with local and international payment gateways (Telebirr, CBE Birr, etc.).
- **Community Service**: Handles forum posts, write-ups, and community interactions.
- **AI Assistant Service**: Provides AI-powered hints and explanations for Premium users.

### Deployment Modeling
The system is deployed on cloud infrastructure (e.g., AWS or DigitalOcean) with the following nodes:

- **Client Node**: User's browser or mobile device.
- **Web Server Node**: Serves the frontend static files (React/Next.js).
- **Application Server Node**: Hosts the backend microservices and API Gateway.
- **Database Node**: Hosts the PostgreSQL database and Redis cache.
- **Lab Execution Node**: Runs the Docker containers for lab environments.

Communication between nodes is secured with HTTPS/TLS.

## Detailed Design

### Design Class Model
The design class model follows an object-oriented approach. Key classes include:

- **User**: Base class for all users, with subclasses Learner, PremiumUser, Instructor, and Admin.
- **LearningPath**: Represents a structured learning path containing multiple modules.
- **Module**: A unit of learning within a path, containing lessons and challenges.
- **Challenge**: A cybersecurity challenge (CTF) with attributes like difficulty, flag, hints, etc.
- **LabSession**: Manages the lifecycle of a containerized lab environment for a challenge.
- **Submission**: Records a user's flag submission for a challenge.
- **Progress**: Tracks a user's progress through modules and challenges.
- **Payment**: Handles subscription payments and transactions.
- **Certificate**: Represents a certificate awarded upon completion of a learning path or course.

### Persistent Model
The persistent model is implemented using PostgreSQL. Key tables include:

- **Users**: Stores user information (id, email, password_hash, role, subscription_tier, etc.).
- **LearningPaths**: Stores learning path details (id, title, description, etc.).
- **Modules**: Stores module details (id, learning_path_id, title, order, prerequisites, etc.).
- **Challenges**: Stores challenge details (id, module_id, title, difficulty, points, docker_image, flag, etc.).
- **LabSessions**: Stores active lab sessions (id, user_id, challenge_id, container_id, start_time, end_time, status).
- **Submissions**: Stores flag submissions (id, user_id, challenge_id, flag, is_correct, submitted_at).
- **Payments**: Stores payment transactions (id, user_id, amount, payment_method, status, transaction_id, etc.).
- **Certificates**: Stores issued certificates (id, user_id, learning_path_id, issued_at, etc.).

Relationships are enforced using foreign keys. Indexes are created on frequently queried columns.

## User Interface Design
The UI is built with React and Next.js, using Tailwind CSS for styling. The design follows a "mobile-first" and "low-bandwidth" approach.

### Design Principles
- **Localized Experience**: Support for English and Amharic languages.
- **Consistency**: Unified design system across all user roles (Learner, Instructor, Admin).
- **Visual Feedback**: Real-time feedback for user actions (e.g., progress bars, success/error messages).

### Interface Components
- **Landing Page**: Hero section, features, pricing, testimonials, and sign-up/login options.
- **Dashboard**: Personalized view for learners, showing progress, recommended content, and quick actions.
- **Learning Console**: Split-screen interface for challenges (left: description/hints, right: embedded terminal/VNC viewer).
- **Admin Panel**: Interface for managing users, content, and platform analytics.

## Access Control and Security
### Authentication and Session Management
- JWT (JSON Web Tokens) for stateless authentication, with short-lived access tokens and refresh tokens.
- OAuth 2.0 support for third-party authentication.
- Secure password reset flow with time-limited tokens.

### Role-Based Access Control (RBAC)
- Roles: Learner, PremiumUser, Instructor, Admin.
- Each role has specific permissions (see Access Control Matrix in the documentation).

### Data Security
- Encryption at rest (AES-256) and in transit (TLS 1.3).
- Input sanitization to prevent injection attacks.
- Isolated lab environments (Docker containers) to prevent host system compromise.

### Threat Modeling (STRIDE)
- Spoofing: Mitigated by JWT and MFA.
- Tampering: Mitigated by hash-based verification and server-side validation.
- Repudiation: Mitigated by immutable audit logs.
- Information Disclosure: Mitigated by encryption and access controls.
- Denial of Service: Mitigated by rate limiting and auto-scaling.
- Elevation of Privilege: Mitigated by strict RBAC and principle of least privilege.
