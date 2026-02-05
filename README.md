# CyberSec Labs - Docker-Based Cybersecurity Training Platform

**A modern, open-source cybersecurity learning platform** combining guided learning paths (like TryHackMe) with hands-on CTF-style challenges (like HackTheBox), using **isolated Docker containers** instead of VPN connections.

Current status: **Early planning / MVP development phase**

## 🎯 Main Goals & Philosophy

- Beginner-friendly onboarding with strong guidance
- Progressive difficulty — from zero-knowledge to advanced real-world scenarios
- True **isolation** through Docker containers (no VPN hassle)
- Focus on **real practical skills** rather than just flags
- Strong progress tracking & skill visualization
- Community + write-ups + discussion integrated into the platform

## 🌐 Project Vision

The goal of this platform is to help learners **practice real-world cybersecurity skills** through:
- Interactive labs
- Structured learning paths
- Community engagement
- Gamified progression

The platform is designed to be **scalable**, **cloud-ready**, and **developer-friendly**, with a strong emphasis on user experience
## 1️⃣ Project Overview

Cybersecurity learning often lacks:
- Realistic practice environments
- Clear learning progression
- Community collaboration

This platform solves these gaps by providing:
- Isolated, real-world labs
- Structured learning paths
- A gamified and interactive experience
- A modern, responsive interface

## ✨ Key Features (Planned / In Progress)

### Core Platform
- User registration, authentication (JWT), profiles & roles
- Structured **learning paths** (Beginner → Intermediate → Advanced + certification tracks)
- **Docker-based labs** — one-click start/stop, auto-cleanup
- Web-based terminal access
- CTF-style challenges with flag submission
- Dynamic scoring + decaying points system
- Multiple leaderboards (global, monthly, category, teams)

### Learning Experience
- Guided rooms (step-by-step) vs pure challenge rooms
- Skill radar chart & weakness detection
- Adaptive/recommended next lab
- Prerequisite system & learning path visualization
- "I'm stuck" system with tiered hints & community help

### Labs Infrastructure
- Single & multi-container labs (Docker Compose support planned)
- Resource limiting & strong isolation
- Auto-cleanup after inactivity
- Per-user unique flags (planned for many challenges)
- Persistent storage option (notes/files between sessions)

### Community & Gamification
- Per-challenge write-ups with voting & moderation
- Discussion threads (spoiler-aware)
- Badges, achievements, daily streaks
- Teams & team competitions
- First Blood recognition

### Advanced / Future Ideas
- Certification preparation tracks (OSCP, eJPT, PNPT style)
- Mock certification exams (proctored)
- Live instructor demonstrations (terminal sharing + video planned)
- "Tool Dojo" — safe playgrounds for nmap, burp, john, etc.
- User-submitted challenges (with review)
- Docker security category (container escapes, misconfigs, registry hunting)

### 🎨 UI Components in Progress
- Header with mega menu
- Footer with quick links
- Home page Call-To-Action (CTA)
- Product-style dropdowns
- Animated sections for engagement

## 🛠️ Tech Stack (Planned)

### Frontend
- React + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Vite / Next.js (optional)

### Backend (Future)
- Node.js
- Prisma ORM
- PostgreSQL (Neon)
- Docker for lab environments

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Run: `docker-compose up -d`
4. Access frontend at: https://localhost (SSL enabled)
5. Access backend API at: https://localhost/api/

## Infrastructure Features

- **SSL/TLS Encryption**: HTTPS enabled with self-signed certificates for development
- **Load Balancing**: Nginx load balancer with multiple backend instances for horizontal scaling
- **Automated Backups**: Daily PostgreSQL database backups with retention
- **Security Hardening**: Rate limiting, security headers, HSTS, and more
- **Health Checks**: Container health monitoring and automatic restarts

## For Development

```bash
# Install dependencies
cd frontend && npm install
cd backend && npm install

# Run development servers
cd backend && npm run dev
cd frontend && npm run dev
```

## Admin Lab Creation

1. Login as admin
2. Navigate to Admin Panel → Lab Creation
3. Use the Lab Wizard to:
   - Select template or create from scratch
   - Edit Dockerfile
   - Define tasks and flags
   - Build and test the lab
   - Publish for users

## Project Structure

```
cybersecurity-platform/
├── frontend/           # React frontend
├── backend/            # Node.js backend
├── lab-templates/      # Pre-built lab templates
├── docker-images/      # Custom Docker images
├── docker-compose-labs/# Multi-container setups
├── docker-host/        # Docker host config
├── admin-tools/        # Admin management scripts
├── docs/              # Documentation
└── tests/             # Test files
```
---

## 📖 Table of Contents

1. Project Overview  
2. Problem Statement  
3. Platform Goals  
4. System Architecture  
5. Development Phases  
6. Frontend Development Process  
7. Backend Development Process  
8. Lab Infrastructure Process  
9. Gamification & Progress Tracking  
10. Security Considerations  
11. Deployment Strategy  
12. Folder Structure  
13. Contribution Guidelines  
14. Project Status  
15. License  

---
