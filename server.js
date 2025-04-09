const express = require("express");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const app = express();
dotenv.config();


app.use(express.json());
app.use("/", authRoutes);
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
