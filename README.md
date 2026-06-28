# TaskFlow — MERN Task Tracker

![TaskFlow Banner](https://img.shields.io/badge/Stack-MERN-5b5bf3?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

A production-ready, full-stack **Task Tracker** web application built with the MERN stack. Features a beautiful dark-mode dashboard with complete CRUD, real-time filtering, sorting, and search — all without page refreshes.

---

## 🌟 Features

### Core CRUD
- ✅ **Create** tasks with title, description, priority, status, and due date
- 👁 **View** all tasks in a responsive card grid
- ✏️ **Edit** tasks via an animated modal form
- 🗑️ **Delete** tasks with a confirmation popup

### Bonus Features
- 🔍 **Search** tasks by title or description (debounced)
- 🎯 **Filter** by Status (Pending / In Progress / Completed)
- 🔖 **Filter** by Priority (Low / Medium / High)
- ↕️ **Sort** by Newest, Oldest, Due Date, or Priority
- 📊 **Stats bar** — live count by status
- ⚠️ **Overdue detection** — cards highlight past-due tasks
- 🔔 **Toast notifications** for all CRUD operations
- 💀 **Loading skeletons** while data fetches
- 🌌 **Empty State UI** with contextual messaging
- 🚫 **404 Page** for unknown routes
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🔒 **Environment Variables** for all sensitive config
- 🛡️ **API error handling** with custom error middleware

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18 + Vite                     |
| Styling    | Tailwind CSS 3                      |
| Routing    | React Router DOM v6                 |
| HTTP Client| Axios                               |
| Toasts     | React Toastify                      |
| Icons      | React Icons (HeroIcons)             |
| Backend    | Node.js + Express.js                |
| Database   | MongoDB Atlas + Mongoose            |
| Validation | express-validator                   |
| Dev Tools  | nodemon, express-async-errors       |
| Deployment | Frontend → Vercel, Backend → Render |

---

## 📁 Folder Structure

```
CRUD assigment/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js     # CRUD handlers
│   ├── middleware/
│   │   ├── errorMiddleware.js    # Global error handler
│   │   └── validate.js           # Validation middleware
│   ├── models/
│   │   └── Task.js               # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js         # Express router
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── DeleteConfirmModal.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PriorityBadge.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── StatusBadge.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── TaskModal.jsx
    │   ├── context/
    │   │   └── TaskContext.jsx   # Global state (useReducer)
    │   ├── hooks/
    │   │   └── useTasks.js       # Custom hook
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── services/
    │   │   └── taskService.js    # Axios API calls
    │   ├── App.jsx
    │   ├── index.css             # Tailwind + custom styles
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
# Leave empty for development (Vite proxy handles it)
# Set to your Render backend URL for production
VITE_API_URL=
```

---

## 🚀 Local Installation

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier works fine)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/task-tracker-mern.git
cd task-tracker-mern
```

### 2. Set up the Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add your MONGO_URI
npm install
npm run dev
```
Backend starts on **http://localhost:5000**

### 3. Set up the Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend starts on **http://localhost:5173**

---

## 🌐 Deployment

### MongoDB Atlas Setup
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new **Cluster** (M0 Free Tier)
3. Add a **Database User** with read/write access
4. Whitelist `0.0.0.0/0` in **Network Access** (for Render)
5. Copy the **Connection String** and paste into `MONGO_URI`

### Backend → Render
1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → **Web Service**
3. Connect your repository
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `MONGO_URI` — your Atlas connection string
   - `PORT` — `5000`
   - `NODE_ENV` — `production`
   - `CLIENT_URL` — your Vercel frontend URL
6. Deploy. Copy the Render URL (e.g. `https://task-tracker-api.onrender.com`)

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your repository
3. Set **Root Directory** to `frontend`
4. Add Environment Variable:
   - `VITE_API_URL` — your Render backend URL
5. Deploy

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| GET    | `/tasks`          | Get all tasks (supports query params)    |
| GET    | `/tasks/:id`      | Get a single task by ID                  |
| POST   | `/tasks`          | Create a new task                        |
| PUT    | `/tasks/:id`      | Update an existing task                  |
| DELETE | `/tasks/:id`      | Delete a task                            |

### Query Parameters for `GET /tasks`
| Param      | Type   | Example              | Description              |
|------------|--------|----------------------|--------------------------|
| `search`   | string | `search=design`      | Search title/description |
| `status`   | string | `status=In Progress` | Filter by status         |
| `priority` | string | `priority=High`      | Filter by priority       |
| `sort`     | string | `sort=dueDate`       | Sort order               |

### Example Requests (curl)
```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build login page",
    "description": "Design and implement the login UI",
    "priority": "High",
    "status": "Pending",
    "dueDate": "2025-07-15"
  }'

# Update a task
curl -X PUT http://localhost:5000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/<id>

# Filter + search
curl "http://localhost:5000/api/tasks?status=Pending&priority=High&sort=dueDate"
```

### Success Response Format
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Title is required",
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```

---

## 🧪 Testing Checklist

- [ ] Backend starts without errors (`npm run dev`)
- [ ] `GET /health` returns `{ success: true }`
- [ ] Create task returns 201 with task data
- [ ] Create task with missing title returns 400 with validation errors
- [ ] Get all tasks returns array
- [ ] Filter by status works
- [ ] Filter by priority works
- [ ] Sort by dueDate works
- [ ] Update task returns updated document
- [ ] Delete task removes it from database
- [ ] Invalid ObjectId returns 404
- [ ] Frontend loads tasks on mount
- [ ] Create modal form validates required fields
- [ ] Toast shows on successful create/update/delete
- [ ] Delete confirmation modal appears before deletion
- [ ] Search filters cards in real time
- [ ] Filter dropdowns work in combination
- [ ] Overdue tasks are highlighted in red
- [ ] 404 page shows for `/unknown-route`
- [ ] Mobile responsive layout works

---

## 🔧 GitHub Push Commands

```bash
git init
git add .
git commit -m "feat: initial production-ready MERN Task Tracker"
git branch -M main
git remote add origin https://github.com/<your-username>/task-tracker-mern.git
git push -u origin main
```

---

## 🔮 Future Improvements

- [ ] JWT Authentication (user accounts)
- [ ] Drag-and-drop task ordering (react-beautiful-dnd)
- [ ] Kanban board view
- [ ] Email reminders for due tasks (nodemailer)
- [ ] Task categories / tags
- [ ] Subtasks and checklists
- [ ] Dark / Light mode toggle
- [ ] Export tasks as CSV
- [ ] Recurring tasks
- [ ] Team collaboration features
- [ ] Progressive Web App (PWA) support

---

## 📸 Screenshots

> _Add screenshots of your deployed app here_

---

## 📄 License

MIT © 2024
