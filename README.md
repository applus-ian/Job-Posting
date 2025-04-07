### Project Objective
Design and deliver an end-to-end recruitment system that enables HR to post jobs, track applicants, schedule interviews, manage offers, and seamlessly onboard new hires into the employee management system.

## Project Scope
**In Scope**

- Job posting creation and public job board
- Applicant tracking with defined status flows
- Resume/document upload & management
- Interview scheduling & structured feedback
- Offer letter generation and digital onboarding
- Integration with employee management system (on hire)

**Out of Scope**

- Integration with external job boards (LinkedIn, Indeed)
- AI resume screening or ranking
- Payroll setup

### Key Deliverables
|            Deliverable            |            Description                           |
| --------------------------------- | ------------------------------------------------ |
| Job Posting Modulee               | Job Posting Module                               |
| Public Job Portal                 | Applicants can browse/apply to jobs              |
| Applicant Tracking System (ATS)   | 	View, filter, and track candidate status       |
| Resume Upload & Document Manager  | Secure upload, view, and download                |
| Interview Scheduling              | Schedule interviews + send email invites         |
| Interview Feedback                | 	Structured forms tied to candidate profiles    |
| Offer Letter & Status Tracking    | Draft → Sent → Accepted/Declined                 |
| Digital Onboarding Forms          | Capture new hire data and push to HRIS           |
| Integration with Employee DB      | 	Hired candidates auto-create employee profiles |

## Work Breakdown Structure (WBS)
- Discovery & Design
    - Wireframes: Job board, ATS, HR admin tools
    - Design interview & offer workflows
    - API schema & data model design
 
- Core Modules
    - Job posting creation & portal
    - ATS: candidate management + status flow
    - Resume upload/document handling
    - Interview scheduling + calendar integration
 
- Workflow Automation
    - Email notifications (interviews, offers)
    - Offer letter generation
    - Digital onboarding form builder
 
- Integration & Onboarding Sync
    - Auto-create employee record on hire
    - Sync onboarding data into employee DB
 
- Testing & Deployment
   - UAT scripts, role-based testing
   - Final deployment + HR training

## Risk Analysis Document
|             Risk                | Impact | Likelihood |                  Description                    |
| ------------------------------- | ------ | ---------- | ----------------------------------------------- |
| Email delivery issues           | High   | Medium     | Use verified transactional email provider       |
| Data privacy with resumes       | High   | Low        | Encrypt files at rest, RBAC enforced            |
| Workflow misalignment (HR)      | Medium | Medium     | Early prototyping, HR validation of flows       |
| Delays in integration with HRIS | Medium | Medium     | Build sync hooks early and test with dummy data |
| Resume format issues            | Low    | High       | Accept PDF only to simplify parsing             |
