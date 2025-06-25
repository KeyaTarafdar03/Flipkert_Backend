import { Request, Response } from "express";
import { errorResponse_CatchBlock } from "../responseObject/errorResponse";
import categoryModel from "../models/categoryModel";
import cloudinary from "../helper/cloudinary";
import { successResponse_created } from "../responseObject/successResponse";

const setFileToBase = (file: Express.Multer.File): string => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const image = req.file as Express.Multer.File;

    const imageData = setFileToBase(image);

    const result = await cloudinary.uploader.upload(imageData, {
      folder: "Flipkert_Application",
      width: 300,
      crop: "scale",
    });

    const category = await categoryModel.create({
      name,
      image: result?.secure_url,
    });

    return successResponse_created(res, "Category Created", category);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {category} = req.body;
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};
