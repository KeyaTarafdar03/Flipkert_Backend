import { NextFunction, Response } from "express";
import { verifyToken } from "../helper/helper";
import userModel from "../models/userModel";
import {
  errorResponse_CatchBlock,
  errorResponse_Unauthorized,
} from "../responseObject/errorResponse";
import { RequestType } from "../types/types";

const isLoggedIn = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    let { authorization } = req.headers;
    if (!authorization) {
      res.status(400).json({ message: "Middleware Bad Request" });
      return;
    }
    let user = verifyToken(authorization || "") as any;
    let existingUser = await userModel.findOne({ email: user?.email });
    if (existingUser) {
      req.user = existingUser;
      next();
    } else {
      return errorResponse_Unauthorized(res);
    }
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export default isLoggedIn;
