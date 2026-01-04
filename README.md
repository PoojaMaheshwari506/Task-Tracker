# 🗂️ Tasker — Task Tracker with Analytics

Tasker is a full-stack web application designed to help users manage their daily tasks efficiently.  
It supports **user authentication**, **CRUD operations on tasks**, and a visually rich **Analytics Dashboard** to track productivity.

The project focuses on clean UI, secure backend, and meaningful analytics — making it suitable for real-world usage as well as portfolio presentation.

---

## 🚀 Features

### 🔐 Authentication
- User Signup & Login
- Password hashing for security
- JWT-based authentication
- User-specific data isolation

### ✅ Task Management (CRUD)
- Add new tasks
- Delete tasks
- Toggle task status (Pending ↔ Completed)
- Assign priority (High / Medium / Low)
- Set due dates
- Search tasks by title

### 📊 Analytics Dashboard
- Total tasks count
- Completed & Pending tasks
- Completion rate (%)
- Task status distribution (Donut chart)
- Priority-wise task distribution (Bar chart)
- Tasks over time (Line chart)
- Clean, pastel-themed UI with responsive layout

### 🎨 UI/UX
- Modern sidebar layout
- Pastel color palette
- Consistent typography
- Hover indicators & active states
- Responsive design

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Recharts (for analytics & charts)
- CSS (custom styling, no UI frameworks)
- LocalStorage (JWT handling)

### Backend
- Flask
- Flask-SQLAlchemy
- SQLite
- JWT (JSON Web Tokens)
- Werkzeug (password hashing)

---

## ⚙️ Installation & Setup

**### 🔹 Frontend Setup**
```bash
cd backend
pip install -r requirements.txt
python app.py

**### 🔹 Frontend Setup**
cd frontend
npm install
npm run dev

🔑 Authentication Flow

User signs up with email & password

Password is securely hashed and stored

On login, a JWT token is generated

Token is stored in localStorage

All protected API routes require Authorization: Bearer <token>
