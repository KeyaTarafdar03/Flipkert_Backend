import { Request } from "express";

export interface RequestType extends Request {
  userId?: any;
  user?: any;
}
