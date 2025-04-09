const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventParticipants,
  getEventById,
  getMyEvents,
  getMyRegistrations,
  unregisterFromEvent,
} = require("../controllers/eventController");

router.use(authenticate);

router.get("/", getAllEvents); // Public route to view all events
router.post("/", authenticate, createEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);
router.post("/:id/register", authenticate, registerForEvent);
router.get("/:id/participants", authenticate, getEventParticipants);
router.get("/my-events", authenticate, getMyEvents);
router.get("/my-registrations", authenticate, getMyRegistrations);
router.delete("/:id/unregister", authenticate, unregisterFromEvent);
router.get("/:id", getEventById);







module.exports = router;
