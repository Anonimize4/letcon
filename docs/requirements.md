# Requirements

## Functional Requirements

| ID | Requirement | Priority | Description |
|----|-------------|----------|-------------|
| FR-01 | User Registration | High | Enables users to create secure accounts using email and password. Includes validation for password strength and email verification. |
| FR-02 | Learning Path Navigation | High | Provides a structured, module-based progression system. Users follow curated learning paths, track progress, and unlock subsequent modules upon completion. |
| FR-03 | Browser-based Labs | High | Offers interactive virtual lab environments accessible directly via the browser. Includes a tiered access model: standard labs for all users and advanced Pro Labs exclusive to Premium subscribers. |
| FR-04 | CTF Challenges | High | Features Capture The Flag (CTF) challenges with tiered difficulty (Easy, Medium, Hard). Supports flag submission, automated validation, and scoring based on challenge complexity. |
| FR-05 | Progress Tracking | High | A comprehensive dashboard for users to monitor their learning journey. Tracks module completion percentages, assessment scores, and earned achievements or badges. |
| FR-06 | Local Payment Integration | High | Facilitates seamless transactions by integrating local and international payment gateways, including Telebirr, CBE Birr, and major credit/debit cards for subscription upgrades. |
| FR-07 | Community Forum | Medium | A collaborative space for users to engage in discussions, share technical write-ups, and participate in peer-to-peer learning and troubleshooting. |
| FR-08 | Admin Dashboard | High | A centralized management interface for administrators to oversee user accounts, curate educational content, and process enterprise-level service requests. |
| FR-09 | Responsive Design | High | Ensures the platform is fully optimized for a seamless user experience across all devices, including mobile smartphones, tablets, and desktop computers. |
| FR-10 | Search Functionality | Medium | Provides a robust search engine allowing users to quickly locate specific CTF challenges, educational lessons, and relevant community forum content. |
| FR-11 | Certificate Generation | Medium | Automatically generates verifiable digital certificates upon the successful completion of courses or learning paths, primarily as a feature for Premium users. |
| FR-12 | Gamification Elements | Medium | Enhances user engagement through competitive elements such as experience points (XP), achievement badges, daily streaks, and global leaderboards. |
| FR-13 | AI Assistant | High | An intelligent, context-aware assistant providing real-time help, hints, and detailed explanations for complex topics, exclusive to Premium subscribers. |
| FR-14 | Enterprise Assessment Requests | Medium | A dedicated dashboard for enterprise clients to manage assessment forms, track team performance, and view detailed skill gap analysis reports. |
| FR-15 | AI Assistant Rate Limiting | High | Implements usage quotas for the AI Assistant to ensure system stability; Premium users are limited to 50 contextual messages per day. |
| FR-16 | Password Reset Flow | High | A secure, email-based recovery system that generates unique reset tokens. For security, tokens automatically expire after one hour of inactivity. |
| FR-17 | Email Verification on Signup | High | Mandates account activation via a secure link sent to the user's email address during registration to prevent bot accounts and ensure valid user data. |
| FR-18 | Challenge Hint System | Medium | Provides up to three progressive hints per CTF challenge. To maintain competitive integrity, using hints incurs a predefined point penalty. |
| FR-19 | Leaderboard Refresh | Medium | Ensures competitive rankings are kept up-to-date using a high-performance Redis sorted set, refreshing either in real-time or at 5-minute intervals. |
| FR-20 | Admin User Suspension | High | Empowers administrators to temporarily or permanently suspend user accounts for policy violations, with mandatory logging of the reason for the action. |
| FR-21 | Challenge Write-up Submission | High | Allows users to submit detailed solutions (write-ups) for challenges. Premium write-ups are only visible to other users after they have successfully solved the challenge. |

## Non-Functional Requirements

### Performance
- The platform is expected to load pages in less than 3 seconds, even on a 2 Mbps internet connection.
- API endpoints need to be able to respond in less than 500 milliseconds for 95% of the requests.
- The system is expected to support more than 1000 users without any issues.
- Browser-based labs need to provision in less than 30 seconds to enable instant access to the labs for the learners.
- Common database queries need to be able to complete in less than 100 milliseconds to ensure the overall efficiency of the system.

### Security
- Authentication is implemented through the enforcement of JWT with refresh capabilities. Additionally, the system will support OAuth 2.0 for integration purposes.
- The system will implement role-based access control to restrict users to the features and data that their role or subscription plan supports.
- The system will also ensure that the data is encrypted both at rest and during transit through the support of TLS 1.3.
- Sanitization of all user inputs will be implemented to prevent injection attacks and other common security threats.
- The system will also ensure that the lab environments are isolated and limited to contain the host system.
- Security event logging will be implemented to ensure that the system can respond to threats in real time.

### Usability
- New users should be able to complete their first challenge within 10 minutes, which ensures learnability.
- Common tasks such as starting labs, submitting flags, and navigating learning paths should be achievable within three clicks.
- The application should adhere to WCAG 2.1 AA, which ensures accessibility to users with disabilities. The application should also support screen readers.
- The application should provide feedback to the user to facilitate smooth navigation.

### Reliability
- The LETHCON system needs to have 99.5% availability, excluding scheduled maintenance periods.
- The system needs to have its recovery objectives set to four hours or less in the event of a system failure.
- The system needs regular back-ups for data integrity, with a 24-hour RPO.
- Error handling needs to be done gracefully, with partial failures not affecting the system.
- The system needs logging and monitoring for anomaly detection.

### Scalability
- It should be able to scale horizontally by adding more backend servers without any downtime.
- Efficient load balancing techniques should be implemented.
- The database should be able to scale to handle queries from increased traffic without slowing down the system.
- Auto-scaling should be implemented.
- It should be able to handle more users, labs, and enterprise clients in the future.

### Maintainability
- Code quality should be of a high standard, with test coverage of at least 80%.
- API documentation, deployment guides, and system manuals are also important.
- Continuous monitoring of system health, performance, and error tracking are also essential.
- The CI/CD process is a requirement for a continuous integration and continuous deployment pipeline.
- The architecture of the system should be modular.

### Regulatory and Compliance
- The data protection should also be in accordance with Ethiopia's Personal Data Protection Proclamation No. 1321/2024.
- The data protection should also be in accordance with international data protection regulations, such as GDPR, which ensures data minimization, limitation of purpose, and transfer of data across borders.
- The data should be anonymized for all tracking, and the data of the users should not be unnecessarily stored.
- The payment processing should be in accordance with PCI-DSS regulations.
- The payment gateways should be secure, such as Telebirr and CBE Birr, which do not require storing card information.
- The lab content should be for ethical hacking only, which does not involve any illegal activities.
- The enterprise should be in accordance with the proper agreements for mentoring, which ensures the non-disclosure agreement and the consent are recorded.
