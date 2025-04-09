const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword, role };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.json({ token });
  };

  module.exports = { registerUser, loginUser };
