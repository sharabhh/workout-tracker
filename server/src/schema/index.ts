import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: String, //name of the exercise
  video: String, //url of the video
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const workoutSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [exerciseSchema],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  workouts: [workoutSchema],
});

const User = mongoose.model("User", userSchema);
export { User };
