# Gidy Job Tracker - Frontend

This is the frontend for the **Gidy Job Tracker** application built with **React**. It provides a user interface for user authentication and managing job applications.

## Features

- User Signup and Login
- Add, Edit, View, and Delete Job Applications
- Track job application status
- Responsive UI

## Technologies Used

- React
- React Router
- Fetch API
- CSS

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gidy-jobtracker-frontend.git
cd gidy-jobtracker-frontend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root folder:
```bash
REACT_APP_API_URL=https://gidy-jobtracker-backend.onrender.com
```
Replace the URL with your backend deployment URL if different.

4. Start the development server:
```bash
npm start
```

The app will run at http://localhost:3000
 by default.

## Environment Variables

| Variable            | Description                      |
|--------------------|----------------------------------|
| `REACT_APP_API_URL` | Base URL for the backend API      |

## Available Routes

| Route       | Component / Description           |
|------------|----------------------------------|
| `/`        | Home (Job Dashboard)              |
| `/login`   | Login Page                        |
| `/signup`  | Signup Page                       |
| `*`        | Redirects to `/` if route not found |

## Deployment

- Deploy the frontend on **Vercel** or any static hosting service.
- Set environment variables (like `REACT_APP_API_URL`) on the deployment platform.
- Ensure the backend URL is accessible from the deployed frontend.

## Usage

1. Sign up or log in to your account.
2. Add a job application by clicking **Add Job**.
3. Edit, view, or delete jobs using the respective buttons.
4. Track application status changes.

License
<br>
MIT License
