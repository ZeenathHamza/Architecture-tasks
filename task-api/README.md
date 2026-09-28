

```markdown
# Task Management API

A backend Task Management API built as a structured **3-tier monolith**, demonstrating strict layer separation between Controllers, Services, and Repositories.

---

## Architecture

This project follows a strict 3-layer architecture. Each layer has exactly **one responsibility** and only talks to the layer directly below it.

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| **Presentation / API** | `src/controllers/` | Handle HTTP requests and responses only. No business logic. |
| **Business Logic** | `src/services/` | Apply business rules and validations. No HTTP or database knowledge. |
| **Data Access** | `src/repositories/` | Store and load data. No business rules. |

### Request Flow

```
1. Client sends HTTP request (e.g., POST /tasks).

2. Router in src/index.js matches URL + method to a controller function.

3. Controller receives req and res.

4. Controller extracts input (req.body, req.params) — no rules applied.

5. Controller calls the Service.

6. Service applies business rules (e.g., "title required").

7. If rule fails, Service throws a plain Error.

8. If rules pass, Service calls the Repository.

9. Repository does the storage operation (in-memory array here).

10. Repository returns data up to the Service.

11. Service returns result to the Controller.

12. Controller maps result/error to an HTTP status code.

13. Controller sends JSON response via res.json(...).

14. Client receives the response.
```

---

##How Layer Separation Is Maintained

### 1. Controllers (`src/controllers/taskController.js`)
- Only deal with `req` and `res`.
- Parse the request, call the appropriate service method, send the HTTP response.
- **Never** touch the repository directly.
- **Never** contain business rules (e.g., "title is required").

### 2. Services (`src/services/taskService.js`)
- Contain **all** business rules and validations.
- **Never** use `req` or `res` — they have no knowledge of HTTP.
- **Never** touch the database or storage directly — they call the repository.
- Throw plain JavaScript `Error` objects when rules are violated, so the controller can translate them into HTTP status codes.

### 3. Repositories (`src/repositories/taskRepository.js`)
- The **only** layer that knows how data is stored.
- Provide a clean interface: `findAll()`, `findById()`, `save()`, `update()`, `delete()`.
- Contain **no** business rules.

### Why this matters

Because the layers are decoupled, swapping the storage layer (for example, migrating from an in-memory array to PostgreSQL or MongoDB) would **only** require rewriting `taskRepository.js`. The service and controller layers would remain **completely unchanged**.

This is the core value of the repository pattern in enterprise architecture.

---

## Note on Data Storage

For this assignment, tasks are stored in an **in-memory array** inside `src/repositories/taskRepository.js`.

This is **intentional**:

- The goal of the assignment is to demonstrate **layer separation**, not database setup.
- All storage logic lives exclusively in the repository layer.
- Because the repository is the only layer that knows about storage, the architecture is proven to be correctly decoupled.
- Data is reset when the server restarts.

---

## How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   node src/index.js
   ```

3. The server runs on **`http://localhost:3000`**.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks |
| `GET` | `/tasks/:id` | Get a single task by ID |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task |

### Example: Create a task

Create a file called `task.json`:
```json
{"title":"Learn architecture","description":"Do the assignment"}
```

Send it with curl:
```bash
curl.exe -X POST http://localhost:3000/tasks -H "Content-Type: application/json" --data-binary "@task.json"
```

**Response:**
```json
{"id":1,"title":"Learn architecture","description":"Do the assignment","completed":false}
```

### Example: Get all tasks
```bash
curl.exe http://localhost:3000/tasks
```

---

## Project Structure

```
task-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js      # Presentation Layer (HTTP handling)
│   ├── services/
│   │   └── taskService.js         # Business Logic Layer (core rules)
│   ├── repositories/
│   │   └── taskRepository.js      # Data Access Layer (storage handling)
│   └── index.js                   # Entry point + route definitions
├── .gitignore
├── README.md
└── package.json
```

---

## Assignment Notes

- **No database** is used — tasks are stored in memory inside the repository layer. This keeps the focus entirely on **architecture and layer separation**, which is the stated goal of the exercise.
- Clean, incremental Git commits were made as each layer was built.
- The architecture follows the "well-structured modular monolith" pattern recommended in the lecture — microservices and distributed complexity are explicitly **not** the starting point.
```

