const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
} = require("../controllers/investmentController");

// All routes protected
router.use(authMiddleware);

// GET all investments
router.get("/", getInvestments);

// ADD investment
router.post("/", addInvestment);

// UPDATE investment
router.put("/:id", updateInvestment);

// DELETE investment
router.delete("/:id", deleteInvestment);

module.exports = router;
