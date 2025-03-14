import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_PASSWORD = process.env.JWT_PASSWORD || "password";

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.header("authorization");
    // console.log(header);
    const token = header?.split(" ")[1];

    // console.log(token);
    if (!token) {
        res.status(403).json({
            message: "Invalid token",
        });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as {
            role: string;
            userId: string;
        };
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(400).json({
            message: "Invalid access",
        });
        return;
    }
};
