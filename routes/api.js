const router = require("express").Router();
const { Workout } = require("../models");
const db = require("../models");

// post a workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});
