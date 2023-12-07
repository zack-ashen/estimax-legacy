import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const PRIVATE_KEY: Secret = (process.env.JWT_PRIVATE_KEY as string).replace(
  /\\n/g,
  "\n"
);

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // No token found

    jwt.verify(token, PRIVATE_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      next();
    });
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      return res.status(401).send({ message: e.message });
    }
    return res.status(401).send({ message: "Token validation failed" });
  }
};
