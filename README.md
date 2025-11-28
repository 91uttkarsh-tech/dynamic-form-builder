# Dynamic Form Builder

Full-stack dynamic form builder with a React client and Node.js + Express server (MongoDB). Admins can create forms with custom fields; end users can render and submit responses. Includes file upload support (local or Base64), CSV export for submissions, and Docker setup.

---

## Project structure

```
dynamic-form-builder/
├── client/        # React application (Vite)
└── server/        # Express API (Node.js + Mongoose)
```

---

## Features

* Admin UI to create, edit, delete forms and fields
* Public form renderer for end-user submissions
* Field types: text, textarea, number, email, date, select, radio, checkbox, file
* File uploads stored locally or as Base64 (configurable)
* Server-side validation and sanitization
* Dynamic per-form submission models in MongoDB
* Export submissions as CSV
* Admin routes protected via `x-admin-token`
* Docker + Docker Compose support

---

## Development Setup (Manual)

### Prerequisites

* Node.js 18+
* npm or yarn
* MongoDB (or Docker for DB)
* Optional: Docker for production-like testing

### 1. Clone repo

```bash
git clone https://github.com/<your-repo>/dynamic-form-builder.git
cd dynamic-form-builder
```

### 2. Server

```bash
cd server
npm install
```

Create `.env` file at `server/.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/formbuilder
JWT_SECRET=supersecretstring
UPLOAD_DIR=uploads
FILE_STORAGE=local   # or "base64"
```

Start server:

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

---

### 3. Client

```bash
cd ../client
npm install
```

Create `.env` file at `client/.env`:

```
VITE_API_BASE=http://localhost:5000
VITE_ADMIN_TOKEN=supersecretstring  # optional for dev admin panel
```

Start client:

```bash
npm run dev
```

Client runs at `http://localhost:5173`.

Test the app manually by opening the client in browser and submitting forms.

---

## Docker Setup (Docker Compose)

Ensure **Docker** is installed on your system.

From project root:

```bash
docker compose build
docker compose up
```

This will start three containers:

* `react_frontend` → client (served via Nginx on port 3002)
* `node_backend` → API server on port 5000
* `mongodb_container` → MongoDB

Open browser at:

```
http://localhost:3002
```

Your frontend will connect to backend automatically via Docker network.

---

## Environment Variables

| Variable             | Purpose                                 | Example                         |
| -------------------- | --------------------------------------- | ------------------------------- |
| **MONGO_URI**        | MongoDB connection string               | `mongodb://mongo:27017/formsdb` |
| **PORT**             | Backend server port                     | `5000`                          |
| **JWT_SECRET**       | Secret for admin route verification     | `supersecretstring`             |
| **UPLOAD_DIR**       | Folder to store uploaded files          | `uploads`                       |
| **FILE_STORAGE**     | File storage mode (`local` or `base64`) | `local`                         |
| **VITE_API_BASE**    | Backend base URL for client             | `http://localhost:5000`         |
| **VITE_ADMIN_TOKEN** | Optional dev admin token for client     | `supersecretstring`             |

---

## API Endpoints

### Public

* `GET /forms` — list forms
* `GET /forms/:id` — get form definition
* `POST /forms/:id/submit` — submit form responses

### Admin (requires `x-admin-token` header)

* `GET /admin/forms` — list all forms
* `POST /admin/forms` — create form
* `PUT /admin/forms/:id` — update form
* `DELETE /admin/forms/:id` — delete form
* `GET /admin/forms/:id/submissions` — list submissions
* `GET /admin/forms/:id/submissions/export` — download CSV
# dynamic-form-builder
