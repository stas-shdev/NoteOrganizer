# Fullstack NoteOrganizer App

A full-stack NoteOrganizer application built with React and Node.js.  
The app allows creating and managing posts organized in groups, with features like search and sorting.

---

## Features

- Full CRUD for posts: create, read, update, and delete  
- Search and sort posts  
- Create and list groups  
- Posts are managed inside groups  

---

## Tech Stack

- Frontend: React  
- Backend: Node.js (custom framework folder for server logic)  
- Database: SQLite (file stored in `server/db/testdb.db`)  

---

## Project Structure

```text
root/
├── client/ # React frontend
│ ├── src/ # React components and styles
│ │ ├── components/UI # Post components like PostEdit, PostForm, etc.
│ │ ├── styles/ # CSS files and fonts
│ ├── package.json
│ └── README.md
│
├── server/ # Node.js backend
│ ├── db/ # SQLite database file
│ ├── framework/ # server app logic, routing, middleware
│ ├── src/ # backend source files (db.js, index.js)
│ ├── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

1. Clone the repo  
2. Install dependencies separately in `client/` and `server/` folders:  
   ```bash
   cd client
   npm install
   cd ../server
   npm install
3. Start backend server:
   ```bash
   node server/index.js
4. Start react app
   ```bash
   npm start --prefix client

After this, the application will be available at http://localhost:3000/

The SQLite database is stored at server/db/testdb.db and is used automatically.

## Future Plans

I think that I will need to improve some aspects and also add some features to my application, such as:

- Add CRUD for groups

- Add authentication

- Improve search and filtering options

- Adding a loading indicator

- Adding error handling

- Refactor the code little by little, add comments.

- Enhance UI styling(optional, as the emphasis is on logic)


## Notes

- This project focuses on core functionality and clean architecture

- UI styling is not so important

- Backend uses custom middleware and routing setup

## Technical solutions

- Instead of converting to a list on the backend, the response was compiled into a JSON file in the database.

- URL conversion has been added to allow the use of "search" parameters (and in the future, "auth", "hash" and others)

- SQLite3 was used as a database for learning SQL, with plans to switch to Postgres

