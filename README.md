# 🎉 Virtual Event Management API

A backend system built with **Node.js** and **Express.js** to manage virtual events. It supports user registration, authentication, role-based access (Organizer & Participant), event creation, registration, and email notifications.

---

## 📦 Features

- ✅ User Authentication with JWT
- ✅ Organizer can create, update, delete events
- ✅ Participants can register for events
- ✅ View all events (public)
- ✅ Organizers can view their created events
- ✅ Participants can view their registered events
- ✅ Organizers can view participants for their events
- ✅ Email confirmation on successful registration

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ThePro8601/virtual-event-management-backend.git
cd virtual-event-management-backend
```

### 2. Install Dependencies

```bash
npm install express bcrypt jsonwebtoken nodemailer dotenv
npm install --save-dev nodemon

```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

### 4. Start the Server

```bash
npm run dev
```

Server runs at `http://localhost:5000`

---

## 🛠️ Project Structure

```
├── controllers/         # Event & auth controllers
├── middleware/          # Authentication middleware
├── routes/              # Event & auth routes
├── utils/               # Utility functions (e.g. sendEmail)
├── data/                # In-memory storage for events and users
├── .env                 # Environment variables
├── server.js            # App entry point
└── README.md
```

---

## 📬 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint     | Description           |
|--------|--------------|-----------------------|
| POST   | `/register`  | Register a user       |
| POST   | `/login`     | Login and get a token |

---

### 📅 Event Routes (Protected)

All routes below require a valid JWT token in the `Authorization` header.

Body Structure to Create an Event:

```bash 
{
  "title": "AI Conference 2025",
  "description": "A virtual conference on the future of AI.",
  "date": "2025-05-01T10:00:00Z"
}
```

**Header Format**:
```
Authorization: Bearer <token>
```

| Method | Endpoint                         | Description                              |
|--------|----------------------------------|------------------------------------------|
| GET    | `/events`                        | Get all events                           |
| POST   | `/events`                        | Create an event (Organizer only)         |
| GET    | `/events/my-events`              | Get events created by the organizer      |
| GET    | `/events/my-registrations`       | Get events registered by the participant |
| GET    | `/events/:id`                    | Get specific event by ID                 |
| PUT    | `/events/:id`                    | Update event (Organizer only)            |
| DELETE | `/events/:id`                    | Delete event (Organizer only)            |
| POST   | `/events/:id/register`           | Register for an event (Participant only) |
| GET    | `/events/:id/participants`       | Get participants (Organizer only)        |
| DELETE | `/events/:id/unregister`         | Unregister from event (Participant only) |

---

## 📧 Email Integration

- Uses **Nodemailer**
- Sends confirmation emails on successful registration
- Works with Gmail or any SMTP provider
- For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) if 2FA is enabled

---

## 🧪 Sample Users

```json
// Organizer
{
  "email": "organizer@example.com",
  "password": "password123",
  "role": "organizer"
}

// Participant
{
  "email": "participant@example.com",
  "password": "password123",
  "role": "participant"
}
```

---

## ✅ Functionalities Overview

| Feature                                 | Description                                                                 |
|----------------------------------------|-----------------------------------------------------------------------------|
| User Registration/Login                | JWT-based authentication                                                   |
| Event Creation                         | Only organizers can create events                                          |
| Event Editing/Deletion                 | Organizers can update or delete their own events                           |
| Event Listing                          | All users can view all public events                                       |
| Event Registration                     | Participants can register for events                                       |
| My Events                              | Organizers can see only the events they created                            |
| My Registrations                       | Participants can see only the events they registered for                   |
| View Participants                      | Organizers can view participants of their events                           |
| Registration Confirmation via Email    | Sent after successful registration                                         |
| Unregister from Event                  | Participants can unregister from an event                                  |

---

## 📌 Future Improvements

- 💾 Use MongoDB/PostgreSQL instead of in-memory storage
- 🧠 Add event search, filtering, and pagination
- 🔍 Add event search by keyword/date
- 🌐 Build frontend with React
- 🧪 Add unit & integration testing with Jest or Mocha
- 📊 Add dashboards for organizers

---

## ✨ Author

Built with ❤️ by [Rudransh Singh]
```