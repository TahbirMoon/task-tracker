# 📘 Project Phase 1 – Definition and Planning
**Project Name**: Task Tracker  
**Student**: Tahbir Ahmed Moon  
**Course**: IT00AL12-3004 – Advanced Web Development  
**Working Mode**: I’m doing the project alone.  
**GitHub Repo**: [https://github.com/TahbirMoon/task-tracker](https://github.com/TahbirMoon/task-tracker)

---

## ✅ Step 1 – Phase Instructions
I went through the Phase 1 instructions, grading criteria, and examples. I used that as a guide to structure this planning document.

---

## ✅ Step 2 – Working Alone
This project is done by me individually.

---

## ✅ Step 3 – Research
To complete this phase, I used AI tools (like ChatGPT), old course examples, and online searches to understand how to plan use cases, design architecture, and organize the frontend/backend. I also attended a few project workshop sessions for guidance.

---

## ✅ Step 4 – GitHub Project Link
[👉 GitHub Repository](https://github.com/TahbirMoon/task-tracker)

---

## 1. 👤 User Personas

### Persona 1 – Nayeem, Student  
- **Age**: 22  
- **Background**: Bachelor's student handling multiple courses  
- **Needs**: Wants a way to organize deadlines and daily tasks  
- **Goal**: Stay focused and reduce missed deadlines  
- **Pain Point**: Often loses track of what’s done vs. what’s left  

### Persona 2 – Sakib Abdullah, Freelancer  
- **Age**: 28  
- **Background**: Works on freelance web development projects  
- **Needs**: Wants a clean and simple interface to manage tasks  
- **Goal**: Easily add, update, and remove tasks while working  
- **Pain Point**: Most apps are too complicated. Abdullah specifically wants an **Edit** button to quickly change a task without re-creating it.

---

## 2. ✅ Use Cases and User Flows

| Use Case       | Description |
|----------------|-------------|
| Add a Task     | User types a task title and due date, clicks Add, and the task appears |
| Complete Task  | User clicks Complete; task becomes marked with green “Completed” |
| Delete Task    | User clicks Delete; task is removed from both UI and database |
| Edit Task      | User clicks Edit; a prompt allows title and date update, saved in backend |

---

## 3. 🖼️ UI Prototypes

The layout is built directly in HTML and CSS — no tools like Figma were used.

### Layout:
- **Top**: Input field, date picker, and Add Task button  
- **Below**: Task list with:
  - Title and due date  
  - Buttons for: Complete, Edit, Delete  
- Completed tasks show a green `[Completed]` label

The layout is responsive and looks clean on different screen sizes.

---

## 4. 🧱 Architecture and Tech Design

### Folder Structure
task-tracker/
├── backend/
│ ├── server.js
│ └── db.js
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── app.js


### Tech Stack
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js with Express  
- Database: SQLite  
- Communication: RESTful API using fetch  
- Environment: Localhost (`localhost:3000`)

---

## 5. 📅 Management and Testing

### Timeline Planning

| Week | Goal                        |
|------|-----------------------------|
| 1    | Plan use cases + layout     |
| 2    | Backend and database setup  |
| 3    | Implement core features     |
| 4    | UI polish and testing       |

### Time Log – Phase 1 Only

| Date       | Used Hours | Task                         | Outcome                                |
|------------|-------------|------------------------------|----------------------------------------|
| 20.04.2025 | 2           | Project planning             | Defined features and structure         |
| 21.04.2025 | 2           | Personas + user flows        | Described realistic users + features   |
| 22.04.2025 | 2           | Architecture + layout design | Finalized tech stack and layout plan   |
| **Total**  | **6**       | –                            | –                                      |

### Testing Plan
- I manually tested each feature (add/edit/delete/complete)  
- Used browser tools to track fetch requests  
- Fixed bugs during development, including handling empty fields

---

## ✅ Summary

In this phase, I planned everything for the Task Tracker app — the users, the features, the layout, and the tech I would use. Having this clear plan from the beginning helped me stay organized and made development easier in the next phases.
