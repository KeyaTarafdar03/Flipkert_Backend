import { Response } from "express";

export const successResponse_created = (
  res: Response,
  message: string,
  data: any
) => {
  res.status(201).send({
    success: true,
    message,
    data,
  });
};

export const successResponse_ok = (
  res: Response,
  message: string,
  data: any
) => {
  res.status(200).send({
    success: true,
    message,
    data,
  });
};

export const successResponse_ok_withToken = (
  res: Response,
  message: string,
  data: any,
  token: string | null
) => {
  res.status(200).send({
    success: true,
    message,
    data,
    token,
  });
};
