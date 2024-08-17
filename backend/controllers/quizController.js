const Quiz = require("../models/quizModels");

// Add a new quiz question
exports.createQuiz = async (req, res) => {
  const { question, options, correctOption } = req.body;
  try {
    const newQuiz = new Quiz({ question, options, correctOption });

    await newQuiz.save();

    res.status(201).json({
      success: true,
      data: newQuiz,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all quiz questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Submit quiz answers for auto-correction
exports.submit = async (req, res) => {
  const { answers } = req.body;
  try {
    const questions = await Quiz.find();
    let score = 0;

    questions.forEach((quiz, index) => {
      if (quiz.correctOption === answers[index]) {
        score += 1;
      }
    });

    res.status(200).json({
      success: true,
      score: score,
      total: questions.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
