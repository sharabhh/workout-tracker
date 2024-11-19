import express, {Request, Response} from "express";
import { User } from "../schema";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("fetch all workouts route");
});

router.get("/:username", async (req,res)=>{
    const username = req.params.username
    const user = await User.find({username})
    res.send(user)
    
})

router.post("/add", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, workout } = req.body;
    // res.send(body);
    // console.log(username, workouts);
    if (!username || !workout) {
        return res.status(400).json({ msg: "Username and workout data are required" });
      }

    const userExists = await User.findOne({ username });

    if (!userExists) {
     return res.status(404).json({ msg: "user doesn't exist." });
    }

    // console.log(userExists);

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
