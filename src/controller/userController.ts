import { Request, Response } from "express";
import {
  errorResponse_AlreadyExists,
  errorResponse_CatchBlock,
  errorResponse_NotFound,
} from "../responseObject/errorResponse";
import sgMail from "@sendgrid/mail";
import {
  successResponse_ok,
  successResponse_ok_withToken,
} from "../responseObject/successResponse";
import userModel from "../models/userModel";
import { generateToken } from "../helper/helper";
import categoryModel from "../models/categoryModel";

export const OTPSending = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    let user = await userModel.findOne({ email });
    if (user) {
      return errorResponse_AlreadyExists(res, "User Already Exists!");
    }
    user = await userModel.create({
      email,
      otp,
    });

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
    // await sgMail.send({
    //   from: process.env.SENDGRID_FROM_EMAIL!,
    //   to: user.email!,
    //   subject: "Verification OTP",
    //   text: `${otp}`,
    // });

    return successResponse_ok(res, "OTP Sent", otp);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    let user = await userModel.findOneAndUpdate(
      { email },
      { $set: { otp } },
      { new: true }
    );
    if (!user) {
      return errorResponse_AlreadyExists(res, "User doesn't Exists!");
    }

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
    // await sgMail.send({
    //   from: process.env.SENDGRID_FROM_EMAIL!,
    //   to: user.email!,
    //   subject: "Verification OTP",
    //   text: `${otp}`,
    // });

    return successResponse_ok(res, "OTP Resend", otp);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return errorResponse_NotFound(res, "User Not Found!");
    }
    const token = generateToken(email, String(user?._id));

    if (otp !== user?.otp) {
      return errorResponse_NotFound(res, "OTP is Wrong!");
    }

    user.otp = null;
    await user.save();

    return successResponse_ok_withToken(res, "OTP Verified", user, token);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    let categories = await categoryModel.find();

    return successResponse_ok(res, "All Category Fetched", categories);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};
