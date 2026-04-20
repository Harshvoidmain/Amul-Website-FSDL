const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes — no token needed
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route — token required
router.get("/profile", protect, getProfile);

// Admin only route — token + admin role required
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;