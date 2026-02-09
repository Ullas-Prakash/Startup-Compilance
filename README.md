# Legal Compliance & Risk Assessment Platform (MVP)

A web-based platform that helps startups understand **legal and compliance risks**
based on their **industry, country, and product features**.

The system collects startup details, evaluates applicable compliance rules,
and generates a **risk score with actionable compliance steps**.

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router
- Tailwind CSS / CSS

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (planned)

---

## 📂 Project Structure

```
project-root/
 ├── client/        # React frontend
 ├── server/        # Node + Express backend
 ├── README.md
 └── .gitignore
```

---

## 🚀 How to Run (Development)

### Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
http://localhost:8000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API CONTRACT (MVP)

Base URL:

```
http://localhost:8000
```

All requests and responses use **JSON**.

---

### 1️⃣ POST `/auth/signup`

Create a new user account.

**Request**

```json
{
  "name": "Ullas",
  "email": "ullas@example.com",
  "password": "password123"
}
```

**Response (201)**

```json
{
  "success": true,
  "message": "User created successfully"
}
```

---

### 2️⃣ POST `/auth/login`

Authenticate user and return token.

**Request**

```json
{
  "email": "ullas@example.com",
  "password": "password123"
}
```

**Response (200)**

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

---

### 3️⃣ POST `/profile`

Save startup onboarding information.

**Headers**

```
Authorization: Bearer <token>
```

**Request**

```json
{
  "industry": "fintech",
  "country": "India",
  "features": {
    "collectsData": true,
    "payments": true,
    "analytics": false
  }
}
```

**Response**

```json
{
  "success": true,
  "message": "Startup profile saved"
}
```

---

### 4️⃣ POST `/evaluate`

Evaluate compliance risk.

**Headers**

```
Authorization: Bearer <token>
```

**Request**

```json
{
  "profileId": "12345"
}
```

**Response (Dummy)**

```json
{
  "overallRiskScore": 7.5,
  "riskLevel": "High",
  "results": [
    {
      "law": "DPDP Act",
      "severity": "High",
      "action": "Appoint Data Protection Officer"
    }
  ]
}
```

---

## 👥 Team Responsibilities

- Backend: Authentication, database models, evaluation logic
- Frontend: UI, routing, forms
- Integration after auth APIs are ready

---

## 📌 Current Status

- Backend setup complete
- MongoDB connected
- Core models created
- API contract finalized
- Auth APIs next
