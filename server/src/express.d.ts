import { Request } from 'express';

// Extend the Express Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;  // Replace 'any' with a more specific type if needed (e.g., { id: string, email: string })
    }
  }
}

