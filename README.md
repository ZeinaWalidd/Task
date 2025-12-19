```markdown
# Task Manager - Fullstack

A secure, production-ready task management application with user authentication and personal task CRUD operations.

## Features

- User signup & signin with JWT authentication
- Protected personal tasks (create, view, edit, delete, mark complete/incomplete)
- Strong password validation (8+ characters, 1 number, 1 letter, 1 special character)
- Responsive and modern UI with MUI
- Complete Postman collection for API testing

## Tech Stack

**Frontend**
- React + TypeScript
- Vite (fast development server)
- MUI (Material UI)
- Axios for API calls
- React Router for navigation

**Backend**
- Node.js + Express + TypeScript
- Prisma ORM
- MySQL database
- JWT for authentication
- bcryptjs for password hashing
- swagger-ui-express + swagger-jsdoc for API documentation

## Setup & Run

### Prerequisites
- Node.js (v18 or higher)
- MySQL (via XAMPP or similar)

### 1. Clone the Repository
```bash
git clone https://github.com/ZeinaWalidd/Task.git
cd Task
```

### 2. Backend Setup
```bash
cd Backend
npm install
npx prisma generate
npx prisma migrate dev --name init
```

Create `.env` in the `Backend` folder:
```env
DATABASE_URL="mysql://root:@localhost:3306/task_manager"
PORT=9999
JWT_SECRET=793dc845bac7bb643bd42e8df6679e4098be52f717a5ec46319ed24f50a90f6cd2384959cabc2fd1db89a576cc3260987c77230c3d52ec994538d5fb94f53bbe

```

Run the backend:
```bash
npm run dev
```

**Backend URL:** `http://localhost:9999`  

### 3. Frontend Setup (open a new terminal)
```bash
cd front-end
npm install
npm run dev
```

**Frontend URL:** `http://localhost:3000`

## API Endpoints

| Method | Endpoint                | Description                     | Auth Required |
|--------|-------------------------|---------------------------------|---------------|
| POST   | `/api/auth/signup`      | Register new user               | No            |
| POST   | `/api/auth/signin`      | Login and return JWT token      | No            |
| GET    | `/api/tasks`            | Get all user tasks              | Yes           |
| POST   | `/api/tasks`            | Create new task                 | Yes           |
| PUT    | `/api/tasks/:id`        | Update task                     | Yes           |
| DELETE | `/api/tasks/:id`        | Delete task                     | Yes           |


## Postman Collection

A complete Postman collection is included in the root:  
`task-manager-api.postman_collection.json`

**How to use:**
1. Import the collection into Postman
2. Run signup or signin first → token is automatically saved
3. All protected task requests use the token via Bearer auth

## Notes & Best Practices

- All task routes are protected with JWT middleware
- Passwords are hashed with bcrypt
- Input validation on both frontend and backend
- Type-safe code with TypeScript throughout
- Prisma for clean, type-safe database operations

Thank you for the opportunity!

**Author:** Zeina Walid  
**Date:** December 20, 2025
```