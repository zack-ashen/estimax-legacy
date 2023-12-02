import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";



export const validateSignUp = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    body('name')
        .exists()
        .withMessage('Name is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]