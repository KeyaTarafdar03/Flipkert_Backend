import { Request } from "express";
import mongoose from "mongoose";

export interface ColorCategoryItem {
  _id?: mongoose.Types.ObjectId;
  color: string;
  image: string;
  isOutOfStock: boolean;
}

export interface SizeCategoryItem {
  _id?: mongoose.Types.ObjectId;
  size: string;
  isOutOfStock: boolean;
}

export interface Product {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  highlights: string;
  category: string;
  image: string;
  colorCategory?: ColorCategoryItem[];
  sizeCategory?: SizeCategoryItem[];
  isOutOfStock: boolean;
}

export interface CartItem {
  count: number;
  color?: string;
  size?: string;
  product?: Product | mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
}

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  phone: string;
  address: string;
  otp: number;
  cart: CartItem[];
  order: mongoose.Types.ObjectId[];
}

export interface AuthenticatedRequest extends Request {
  user?: User & { _id: mongoose.Types.ObjectId };
}

export interface ColorCategoryItem {
  color: string;
  image: string;
  isOutOfStock: boolean;
}

export interface SizeCategoryItem {
  size: string;
  isOutOfStock: boolean;
}

export interface Product {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  highlights: string;
  category: string;
  image: string;
  colorCategory?: ColorCategoryItem[];
  sizeCategory?: SizeCategoryItem[];
  isOutOfStock: boolean;
}

export interface CartItem {
  count: number;
  color?: string;
  size?: string;
  product?: Product | mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
}

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  phone: string;
  address: string;
  otp: number;
  cart: CartItem[];
  order: mongoose.Types.ObjectId[];
}

export interface AuthenticatedRequest extends Request {
  user?: User & { _id: mongoose.Types.ObjectId };
}