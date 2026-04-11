# Online Examination Application API Documentation

## Base URL
`/api`

---

## Authentication API

### 1. User Registration

Register a new user account (Student or Teacher).

- **URL**: `/auth/register`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body
| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `username` | string | Yes | Not Blank | Unique identifier for the user. |
| `fullName` | string | Yes | Not Blank | Full name of the user. |
| `password` | string | Yes | Regex | Must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number. |
| `role` | string | Yes | `STUDENT` \| `TEACHER` | The role the user is registering for. |

**Example Request:**
```json
{
  "username": "student123",
  "fullName": "John Doe",
  "password": "StrongPassword1",
  "role": "STUDENT"
}
```

#### Responses

**Success (201 Created)**
```json
{
  "message": "Registration successful.",
  "username": "student123",
  "fullName": "John Doe",
  "role": "STUDENT"
}
```

**Validation Error (400 Bad Request)**
```json
{
  "message": "Validation failed",
  "errors": {
    "password": "Password must be at least 8 characters and include uppercase, lowercase, and a number"
  }
}
```

**Conflict Error (409 Conflict)**
```json
{
  "message": "Username is already taken"
}
```

---

### 2. User Login

Authenticate an existing user to use the platform.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body
| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `username` | string | Yes | Not Blank | The user's registered username. |
| `password` | string | Yes | Not Blank | The user's account password. |

**Example Request:**
```json
{
  "username": "student123",
  "password": "StrongPassword1"
}
```

#### Responses

**Success (200 OK)**
```json
{
  "message": "Login successful",
  "username": "student123",
  "fullName": "John Doe",
  "role": "STUDENT"
}
```

**Unauthorized (401 Unauthorized)**
```json
{
  "message": "Invalid username or password"
}
```

---

## Common Error Responses

If validation constraints fail or global issues exist, the server defaults to returning standard formatted JSON detailing the errors:

| Status Code | Description |
| :--- | :--- |
| **400** | Validation fail (e.g. missing fields, bad password syntax, role invalid). |
| **401** | Invalid credentials (wrong password / username combination). |
| **409** | Duplication conflict (e.g., trying to use an existing username). |
