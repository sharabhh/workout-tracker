import z from "zod";

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"), // Ensures non-empty string
  video: z.string().optional(),
  sets: z.number().nullable(),
  reps: z.number().nullable(),
  weight: z.number().nullable(),
});

const workoutDataSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  exercises: z
    .array(exerciseSchema)
    .nonempty("Atleast one exercise is required."),
});

export default workoutDataSchema;
