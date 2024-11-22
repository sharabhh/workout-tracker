import express, { application, Request, Response } from "express";
import { User } from "../schema";
import dotenv from "dotenv";
import { verifyJwt } from "../middleware/auth";

dotenv.config();
const router = express.Router();
const credentials = {
  access_key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.SECRET_ACCESS_KEY,
  bucketName: process.env.BUCKET_NAME,
};
// @ts-ignore
router.use(verifyJwt);



router.get("/", async (req: Request, res: Response): Promise<any> => {
  const { username, id } = req.user;

  const userExists = await User.find({ username });
  if (!userExists) {
    return res.status(404).json({ msg: "user doesn't exist" });
  }

  // @ts-ignore
  const workout: any = [];
  userExists.forEach((item) => workout.push(item.workouts));

  res.json(workout);


});

router.get(
  "/search/:workoutName",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const username = req.user.username;
      const workoutName = req.params.workoutName.toLowerCase();

      const userExists = await User.findOne({ username });
      if (!userExists) {
        return res.status(404).json({ msg: "user doesn't exist" });
      }

      if (!userExists.workouts || userExists.workouts.length === 0) {
        return res.status(404).json({ msg: "No workouts found" });
      }

      if (!workoutName) {
        return res.status(200).json(userExists.workouts);
      }

      const filteredWorkouts = userExists.workouts.filter(
        (workout) =>
          workout &&
          workout.name &&
          workout.name.toLowerCase().startsWith(workoutName)
      );

      res.json(filteredWorkouts);
    } catch (e) {

      return res.status(500).json({ msg: "Internal server error" });
    }
  }
);

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.find({ username });
  res.send(user);
});

router.post("/add", async (req: Request, res: Response): Promise<any> => {
  try {
    const workout = req.body;
    const username = req.user.username;

    if (!username || !workout) {
      return res
        .status(400)
        .json({ msg: "Username and workout data are required" });
    }

    const userExists = await User.findOne({ username });

    if (!userExists) {
      return res.status(404).json({ msg: "user doesn't exist." });
    }

    // if we use unshift it won't be the best approach as that affects thje entire array and is slower for the Big O of time complexitity
    userExists?.workouts.push(workout);
    await userExists?.save();

    return res.send("received");
  } catch (e) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const workoutId = req.params.id;
    const username = req.user.username;

    if (!workoutId) {
      return res.status(400).json({ msg: "Workout ID is required." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const workoutIndex = user.workouts.findIndex(
      (workout: any) => workout._id.toString() === workoutId
    );

    if (workoutIndex === -1) {
      return res.status(404).json({ msg: "Workout not found." });
    }

    user.workouts.splice(workoutIndex, 1);

    await user.save();

    return res.status(200).json({ msg: "Workout deleted successfully." });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
});


export default router;
