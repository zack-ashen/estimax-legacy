import { NextFunction, Request, Response } from "express";

export class ServerError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Error handling middleware
export function errorHandler(err: ServerError, req: Request, res: Response, next: NextFunction) {
  return res.status(err.status).json({
    error: err.message
  })
}

