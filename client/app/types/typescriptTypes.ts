interface Exercise {
    name: string;
    video: string;
    sets: number;
    reps: number;
    weight: number;
    _id: string;
  }
  
  interface Workout {
    name: string;
    exercises: Exercise[];
  }
  
  interface User {
    _id: string;
    username: string;
    workouts: (Workout | null)[];
    __v: number;
  }
  
export {User as userType} 