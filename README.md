# DevTrack Pro

A simple, focused project tracker for developers who want to keep ideas, deadlines, and progress in one place.

DevTrack Pro lets users create projects, update their status, set priority, add due dates, and manage everything from a clean dashboard.

## Highlights

- User registration and login
- Session-based authentication
- Create, edit, and delete projects
- Project status tracking: Planned, In Progress, Completed
- Priority labels: Low, Medium, High
- Optional due dates with overdue and due-soon indicators
- Dashboard summary cards including overdue count
- Search projects by title or description
- Filter by status and priority
- Quick status updates from the project list
- Dark mode with system preference support
- Flash messages for auth and project actions
- MongoDB-backed project storage
- Production-ready environment variable setup

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS templates
- Express Session
- Connect Mongo session store
- bcrypt password hashing

## Project Structure

```txt
devtrack-pro/
├── Controller/
│   ├── authController.js
│   └── projectController.js
├── config/
│   └── db.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Project.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── projectRoutes.js
├── views/
│   ├── dashboard.ejs
│   ├── login.ejs
│   └── register.ejs
├── app.js
├── DEPLOYMENT.md
└── package.json
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=replace_with_a_long_random_secret
NODE_ENV=development
```

Start the app:

```bash
npm start
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm start
```

Runs the Express server.

```bash
npm run dev
```

Runs the app with nodemon if nodemon is installed.

## Deployment

This app is ready to deploy on Render.

Recommended Render settings:

```txt
Build Command: npm install
Start Command: npm start
```

Required environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=use_a_long_random_secret
NODE_ENV=production
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full deployment checklist.

## Future Ideas

- Team collaboration
- Project activity timeline
- Kanban board view
- File attachments

## Author

Built as a practical full-stack Node.js project.
