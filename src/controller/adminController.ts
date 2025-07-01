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

import streamifier from "streamifier";

const streamUpload = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
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
    const { category, name, price, description, highlights, colors, sizes } =
      req.body;

    if (!name || !price || !description || !category) {
      return errorResponse_BadRequest(res);
    }

    let sizeCategory: { size: string; isOutOfStock: boolean }[] = [];
    if (sizes) {
      const sizeList: string[] = JSON.parse(sizes);
      sizeCategory = sizeList.map((size) => ({
        size,
        isOutOfStock: false,
      }));
    }

    if (!colors) {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return errorResponse_BadRequest(res);
      }

      const uploadedMainImage = await streamUpload(files[0].buffer);

      const newProduct = new productModel({
        name,
        price,
        description,
        highlights,
        category,
        image: uploadedMainImage.secure_url,
        sizeCategory,
        isOutOfStock: false,
      });

      await newProduct.save();

      return successResponse_created(
        res,
        "Product added successfully",
        newProduct
      );
    } else {
      let colorCategory = [];
      if (colors && Array.isArray(req.files) && req.files.length > 0) {
        const colorList: string[] = JSON.parse(colors);

        const colorImages = req.files as Express.Multer.File[];

        if (!colorImages || colorImages.length === 0) {
          return errorResponse_BadRequest(res);
        }

        for (let i = 0; i < colorList.length; i++) {
          const color = colorList[i];

          const uploadRes = await streamUpload(colorImages[i].buffer);
          colorCategory.push({
            color,
            image: uploadRes.secure_url,
            isOutOfStock: false,
          });
        }
      }

      // const newProduct = new productModel({
      //   name,
      //   price,
      //   description,
      //   highlights,
      //   category,
      //   colorCategory,
      //   sizeCategory,
      //   isOutOfStock: false,
      // });
      const newProduct = await productModel.create({
        name,
        price,
        description,
        highlights,
        category,
        colorCategory,
        sizeCategory,
        isOutOfStock: false,
      });

      await categoryModel.findOneAndUpdate(
        { name: category },
        { $push: { products: newProduct._id } }
      );

      return successResponse_created(
        res,
        "Product added successfully",
        newProduct
      );
    }
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};
