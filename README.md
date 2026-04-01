# Frontend - Backoffice Admin

React backoffice admin application used to manage platform data (users, demandes, dons, affectations, events, logs).

## Tech Stack

- React 19
- Vite
- React Router
- Ant Design
- Axios

## Main Features

- Authentication (login, signup, forgot/reset password)
- Admin dashboard
- User management
- Role-specific listings (femmes, benevoles, associations, donateurs)
- Demandes and dons management
- Affectations and events management
- Logs viewer
- Profile and password change

## Positionnement dans l'architecture

Ce projet `frontend` correspond au backoffice administrateur.

Le dashboard administrateur permet de :
- gerer les utilisateurs ;
- valider les demandes et contenus ;
- suivre les actions, les affectations et les dons ;
- consulter les logs et indicateurs globaux pour le pilotage de la plateforme.

## Project Structure

```text
frontend/
	src/
		api/                        # API calls grouped by domain
		components/
			route/ProtectedRoute.jsx  # Route guard
			layout/                   # Sidebar/topbar components
		contexts/
			AuthContext.jsx           # Auth token and current user state
		layouts/
			AdminLayout.jsx
		pages/
			admin/                    # Backoffice screens
			shared/                   # Auth/profile shared pages
		utils/
			axiosClient.js            # Axios instance + interceptors
```

## Routing Overview

Public routes:
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password/:token`

Protected routes (authenticated):
- `/profile`
- `/change-password`

Admin-only routes (`ADMINISTRATEUR` role):
- `/dashboard`
- `/user/list`
- `/user/add`
- `/user/edit/:id`
- `/femmes`
- `/benevoles`
- `/associations`
- `/donateurs`
- `/demandes`
- `/dons`
- `/affectations`
- `/events`
- `/logs/list`

## Environment Variables

Create `.env` in `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

## Install and Run

```bash
cd frontend
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Authentication Behavior

- Token key used by this app: `auth-token`
- Token is added automatically by Axios interceptor
- On `401`, token is removed and user is redirected to `/login`

## Notes

- This app is focused on backoffice/admin workflows.
- If another frontend is already running on port `5173`, start this app with another port:

```bash
npm run dev -- --port 5174
```
