import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";

// Joi schema for validating book id
const idValidation = Joi.object({
  id: Joi.string(), 
});

class DeleteBookMiddleware {
  deleteValidation(req: Request, res: Response, next: NextFunction) {

    const secret = process.env.JWT_SECRET || '';
    const { error, value } = idValidation.validate(req.params);
    if (error) {
      return res.status(400).json({
        statusCode: 400,
        status: "Failure",
        message: "Invalid book ID format",
      });
    }

    (req as any).validatedBookId = value.id;

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        statusCode: 401,
        status: "Failure",
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        status: "Failure",
        message: "Token missing",
      });
    }

    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({
        statusCode: 401,
        status: "Failure",
        message: "Invalid or expired token",
      });
    }

    if (
      typeof decoded !== "object" ||
      !decoded ||
      (decoded as any).role !== "admin"
    ) {
      return res.status(403).json({
        statusCode: 403,
        status: "Failure",
        message: "Admin privileges required",
      });
    }

    (req as any).user = decoded;

    next();
  }
}

export const deleteBookMiddleware = new DeleteBookMiddleware();
