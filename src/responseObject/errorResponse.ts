import { Response } from "express";

export const errorResponse_BadRequest = (res: Response) => {
  res.status(400).json({ success: false, message: "Bad Request" });
};

export const errorResponse_BadRequest_WithMsg = (
  res: Response,
  message: string
) => {
  res.status(400).json({ success: false, message });
};

export const errorResponse_CatchBlock = (res: Response, err: any) => {
  const error = err as Error;
  res.status(500).json({
    success: false,
    error: error.message,
    message: "Intenal Server Error",
  });
};

export const errorResponse_NotFound = (res: Response, message: string) => {
  res.status(404).json({ success: false, message });
};

export const errorResponse_Forbidden = (res: Response, message: string) => {
  res.status(403).json({ success: false, message });
};

export const errorResponse_AlreadyExists = (res: Response, message: string) => {
  res.status(409).json({ success: false, message });
};

export const errorResponse_Unauthorized = (res: Response) => {
  res.status(401).json({ success: false, message: "Unauthorized" });
};
