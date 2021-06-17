const router = require("express").Router();
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

// add an exercise
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// workouts from last 7 days
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$execrises.duration" } })
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// get most recent workout
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$execrises.duration" } })

    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
