const express = require("express");

const {
  createQuiz,
  getAllQuestions,
  submit,
} = require("../controllers/quizController");
const router = express.Router();

router.post("/add", createQuiz);
router.get("/all", getAllQuestions);
router.post("/submit", submit);

module.exports = router;
