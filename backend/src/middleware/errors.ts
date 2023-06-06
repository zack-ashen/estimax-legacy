import { NextFunction, Request, Response } from "express";

export class ServerError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}

// Error handling middleware
export function errorHandler(err: ServerError, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
}

