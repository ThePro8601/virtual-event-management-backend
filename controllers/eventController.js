const events = require("../data/events");
const { get } = require("../routes/events");

let eventId = 1;

const createEvent = (req, res) => {
  const { title, date, time, description } = req.body;

  const newEvent = {
    id: eventId++,
    title,
    date,
    time,
    description,
    organizer: req.user.email,
    participants: [],
  };

  events.push(newEvent);
  res.status(201).json({ message: "Event created", event: newEvent });
};

const getAllEvents = (req, res) => {
  res.json(events);
};

const updateEvent = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.organizer !== req.user.email) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const { title, date, time, description } = req.body;
  if (title) event.title = title;
  if (date) event.date = date;
  if (time) event.time = time;
  if (description) event.description = description;

  res.json({ message: "Event updated", event });
};

const deleteEvent = (req, res) => {
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  const event = events[index];
  if (event.organizer !== req.user.email) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  events.splice(index, 1);
  res.json({ message: "Event deleted" });
};

const sendEmail = require("../utils/sendEmail");

const registerForEvent = async (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.participants.includes(req.user.email)) {
    return res.status(400).json({ message: "Already registered" });
  }

  event.participants.push(req.user.email);

  try {
    await sendEmail(
      req.user.email,
      `Registration Confirmed: ${event.title}`,
      `Hello,\n\nYou have successfully registered for "${event.title}" scheduled on ${event.date} at ${event.time}.\n\nDescription: ${event.description}\n\nThank you!`
    );
  } catch (error) {
    console.error("Email sending failed:", error);
  }

  res.json({ message: "Registered successfully. Confirmation email sent." });
};

const getEventParticipants = (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
  
    if (event.organizer !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    res.json({ participants: event.participants });
};

const getEventById = (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
  
    res.json(event);
};

const getMyEvents = (req, res) => {
    const myEvents = events.filter(e => e.organizer === req.user.email);
    res.json(myEvents);
};

const getMyRegistrations = (req, res) => {
  const userEmail = req.user.email;

  const registeredEvents = events
    .filter(event => event.participants.includes(userEmail))
    .map(({ id, title, date, time, description, organizer }) => ({
      id,
      title,
      date,
      time,
      description,
      organizer,
    }));

  res.json(registeredEvents);
};

const unregisterFromEvent = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: "Event not found" });

  const userEmail = req.user.email;
  const index = event.participants.indexOf(userEmail);

  if (index === -1) {
    return res.status(400).json({ message: "You are not registered for this event" });
  }

  event.participants.splice(index, 1);
  res.json({ message: "Successfully unregistered from the event" });
};


module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent, registerForEvent, getEventParticipants, getEventById, getMyEvents, getMyRegistrations, unregisterFromEvent };
