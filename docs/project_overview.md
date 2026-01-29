# Project Overview

## Project Name
LETHCON - Localized Cybersecurity Learning Platform

## Objectives
### General Objective
To develop a scalable, gamified cybersecurity learning platform that provides structured education, hands-on practice, AI-assisted guidance, and enterprise assessment services.

### Specific Objectives
1. Develop structured learning paths from beginner to advanced levels.
2. Implement low-bandwidth optimization for users with limited connectivity.
3. Integrate local and international payment gateways (Telebirr, CBE Birr, cards).
4. Provide free labs for all users and exclusive Pro Labs for Premium subscribers.
5. Implement an AI-powered assistant for Premium users (using cost-controlled LLM API access with monthly per-user token quota, answer caching, and fallback to static hints).
6. Create hands-on CTF challenges and browser-based lab environments.
7. Enable organizations to request custom security assessments and training.
8. Implement gamification elements (points, badges, leaderboards) for engagement.
9. Ensure platform scalability and comprehensive progress tracking.

## Technology Stack
### Frontend
- React with Next.js framework
- Tailwind CSS for styling

### Backend
- Node.js with Express for RESTful API
- FastAPI for Python-based services (AI assistant and lab orchestration)

### Database
- PostgreSQL (primary relational database)
- Redis (caching and session management)

### Containerization and Orchestration
- Docker for containerization
- Kubernetes for orchestration and scaling

### Authentication and Security
- JSON Web Tokens (JWT) for authentication
- OAuth 2.0 support

### Lab Environments
- Browser-based virtual machines
- Containerized challenge environments (Docker)

## Methodology
- Object-Oriented Analysis and Design (OOAD)
- Agile development with Scrum framework
- UML diagrams for documentation
- User-Centered Design (UCD) approach
