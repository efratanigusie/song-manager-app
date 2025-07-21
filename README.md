# Song Management App

A full-stack application for managing songs (CRUD operations) with a React frontend, Node.js/Express backend, Redux/Redux-Saga for state management, and Jest for testing.

---

## Key Features

- View, Add, Edit, Delete songs
- Paginated song list

---

## Tech Stack

- **Frontend**: React, Redux Toolkit, Redux-Saga, Emotion, Webpack
- **Backend**: Node.js, Express.js
- **Testing**: Jest, Redux Saga Test Plan

---

## Quick Setup

1.  **Clone the repository**:
    ```bash
    git clone <https://github.com/efratanigusie/song-manager-app.git>
    cd song-management-app
    ```
2.  **Backend Setup**:

    ```bash
    cd backend
    npm install
    node server.js # or nodemon server.js
    ```

3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    # Create .env: API_BASE_URL=http://localhost:5000/api
    npm start
    ```
    View app at `http://localhost:3000` (or `3001`).

---

## API Endpoints (Base: `http://localhost:5000/api`)

- `GET /songs`: Get all songs (with `page`, `limit` query).
- `GET /songs/:id`: Get single song.
- `POST /songs`: Add new song.
- `PUT /songs/:id`: Update song.
- `DELETE /songs/:id`: Delete song.

---

## Testing

Run frontend unit tests:

```cmd
cd frontend
npm test

```
