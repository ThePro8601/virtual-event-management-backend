const express = require("express");
const router = express.Router();
const { getUsersByRole } = require("../controllers/userController");

router.get("/", getUsersByRole); // GET /users or /users?role=organizer

module.exports = router;
