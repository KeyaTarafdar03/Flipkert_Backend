import { Request, Response } from "express";
import {
  errorResponse_BadRequest,
  errorResponse_CatchBlock,
} from "../responseObject/errorResponse";
import categoryModel from "../models/categoryModel";
import cloudinary from "../helper/cloudinary";
import { successResponse_created } from "../responseObject/successResponse";
import productModel from "../models/productModel";

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
    const { category, name, price, description, highlights, colors, sizes } = req.body;

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "Missing required product fields" });
    }

    const uploadedMainImage = await cloudinary.uploader.upload(
      (req.files as any).mainImage[0].path
    );

    let colorCategory = [];
    if (colors && (req.files as any).colorImages) {
      const colorList: string[] = JSON.parse(colors); // e.g., '["red", "green"]'
      const colorImages = (req.files as any).colorImages;

      for (let i = 0; i < colorList.length; i++) {
        const color = colorList[i];
        const colorImage = colorImages[i];

        const uploadRes = await cloudinary.uploader.upload(colorImage.path);
        colorCategory.push({
          color,
          image: uploadRes.secure_url,
          isOutOfStock: false,
        });
      }
    }

    let sizeCategory: { size: string; isOutOfStock: boolean }[] = [];
    if (sizes) {
      const sizeList: string[] = JSON.parse(sizes);
      sizeCategory = sizeList.map((size) => ({
        size,
        isOutOfStock: false,
      }));
    }

    const newProduct = new productModel({
      name,
      price,
      description,
      highlights,
      category,
      image: uploadedMainImage.secure_url,
      colorCategory,
      sizeCategory,
      isOutOfStock: false,
    });

    await newProduct.save();

    return successResponse_created(
      res,
      "Product added successfully",
      newProduct
    );
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

