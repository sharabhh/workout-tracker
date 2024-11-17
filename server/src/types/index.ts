import {z} from "zod"

const userTypes = z.object({
    username: z.string(),
    password: z.string()
})

export { userTypes }