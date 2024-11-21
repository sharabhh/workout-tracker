import express, { application, Request, Response } from "express";
import { User } from "../schema";
import AWS from "aws-sdk";
import { any } from "zod";
import dotenv from "dotenv";
import { verifyJwt } from "../middleware/auth";

dotenv.config();
const router = express.Router();
const credentials = {
  access_key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.SECRET_ACCESS_KEY,
  bucketName: process.env.BUCKET_NAME,
};
console.log(credentials);
// @ts-ignore
router.use(verifyJwt);

const s3 = new AWS.S3({
  accessKeyId: credentials.access_key,
  secretAccessKey: credentials.secret,
});

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const { username, id } = req.user;
  // console.log("user is ", username);

  const userExists = await User.find({ username });
  if (!userExists) {
    return res.status(404).json({ msg: "user doesn't exist" });
  }

  // @ts-ignore
  const workout: any = [];
  userExists.forEach((item) => workout.push(item.workouts));
  console.log(workout);
  res.json(workout);

  // const workouts = userExists.

  // if (credentials.bucketName) {

  //   const params = {
  //     Bucket: credentials.bucketName, // Guaranteed to be a string here
  //     Key: "hello-world.txt",
  //     Body: "hello world",
  //   };

  //   s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
  //     if (err) {
  //       console.error("Error uploading to S3:", err);
  //     } else {
  //       console.log("Uploaded to:", data.Location);
  //     }
  //   });
  // } else {
  //   console.error("Bucket name is not defined in environment variables.");
  // }

  // res.send("fetch all workouts route");
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
      console.log("fileterd workouts are: ", filteredWorkouts);

      res.json(filteredWorkouts);
    } catch (e) {
      console.log(e);

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
    console.log("-------middleware verified now inside the function--------");

    // console.log(req.body);

    const workout = req.body;
    const username = req.user.username;
    console.log("username from headers on backend is ", username);

    // res.send(body);
    console.log(username, workout);

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
    const updatedUser = await userExists?.save();

    // console.log(updatedUser);

    // finding a specific workout in array
    // const lastWorkout = updatedUser.workouts[1]
    // console.log(lastWorkout);

    return res.send("received");
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
