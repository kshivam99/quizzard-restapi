const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Topic = require("../models/Topic");

router.get("/",async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/topics",async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.json({ message: err });
  }
});


router.get("/:quizId", async (req, res) => {
  try {
    const quizTopic = await Topic.findOne({ _id: req.params.quizId });
    const questions = await Quiz.find({ topic: quizTopic.topic });
    res.json(questions);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
    const quiz = new Quiz({
      topic:req.body.topic,
      question:req.body.question,
      correct_answer:req.body.correct_answer,
      incorrect_answers:req.body.incorrect_answers,
      explanation:req.body.explanation
    });
    try {
      const savedQuiz = await quiz.save();
      res.json(savedQuiz);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  router.post("/topics", async (req, res) => {
    const topic = new Topic({
      topic:req.body.topic
    });
    try {
      const savedTopic = await topic.save();
      res.json(savedTopic);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
  
  
module.exports = router;
