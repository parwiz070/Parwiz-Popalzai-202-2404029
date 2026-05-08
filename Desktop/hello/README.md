# mediCare Hub - Clinic Appointment Management System

MediCare Hub is a full-stack clinic appointment management system built for the Web Engineering assignment.

## Student Information

Name: Parwiz Popalzai  
ID: 202-2404029  
Submitted to: Mr. Khalilullah Akbari  
Subject: Web Engineering  

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- TailwindCSS
- Passport.js
- Express Session
- Method Override
- Bcrypt.js

## Main Features

- User registration
- User login/logout
- Protected routes
- Add clinic appointments
- View appointment details
- Edit appointments
- Delete appointments
- RESTful CRUD API
- Search appointments
- Filter by status
- Filter by department
- Dashboard analytics
- Premium responsive UI

## Main Resource

Appointments

### Appointment Fields

- Patient Name
- Doctor Name
- Department
- Appointment Date
- Appointment Time
- Status
- Notes

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get one appointment |
| POST | `/api/appointments` | Create appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Delete appointment |

## How To Run The Project

### 1. Install Node.js

Make sure Node.js is installed.

### 2. Before running the project, try to run the below command to execute creating an admin/default user:
### npm run seed
Check version:

```bash
node -v
