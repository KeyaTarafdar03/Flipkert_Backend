import { Request, Response } from "express";
import {
  errorResponse_AlreadyExists,
  errorResponse_BadRequest,
  errorResponse_BadRequest_WithMsg,
  errorResponse_CatchBlock,
  errorResponse_NotFound,
  errorResponse_Unauthorized,
} from "../responseObject/errorResponse";
// import sgMail from "@sendgrid/mail";
import {
  successResponse_created,
  successResponse_ok,
  successResponse_ok_withToken,
} from "../responseObject/successResponse";
import userModel from "../models/userModel";
import { generateToken } from "../helper/helper";
import categoryModel from "../models/categoryModel";
import productModel from "../models/productModel";
import { RequestType } from "../types/types";
import { AuthenticatedRequest } from "../types/interfaces";
import {
  userCartFormater,
  userOrderFormater,
  userWishlistFormater,
} from "../responseObject/formatResponse";
import orderModel from "../models/orderModel";

export const OTPSending = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const fetchUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse_Unauthorized(res);
    }

    let user = req.user;

    const updatedCart = await userCartFormater(user);
    const updatedOrder = await userOrderFormater(user);
    const updatedWishlist = await userWishlistFormater(user);
    const newUser = {
      _id: user._id,
      email: user.email,
      cart: updatedCart,
      order: updatedOrder,
      wishlist: updatedWishlist,
      username: user.username,
      phone: user.phone,
      address: user.address,
    };

    return successResponse_ok(res, "User Fetched", newUser);
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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category;

    if (category) {
      const existingCategory = await categoryModel
        .findOne({ name: category })
        .populate("products");
      const allProducts = existingCategory?.products;
      Array.isArray(allProducts) &&
        allProducts?.forEach((item: any) => {
          delete item.__v;
        });
      return successResponse_ok(
        res,
        `All ${category} Products Fetched`,
        allProducts
      );
    }
    const products = await productModel.find();
    return successResponse_ok(res, "All Products Fetched", products);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const addToCart = async (req: RequestType, res: Response) => {
  try {
    const user = req.user;
    const { productId } = req.body;
    const color = req.body.color || null;
    const size = req.body.size || null;

    const product = await productModel.findById(productId);
    if (!product) {
      return errorResponse_NotFound(res, "Product Not Found");
    }

    if (product.colorCategory && product.colorCategory.length > 0) {
      if (!color) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Color is required for this product"
        );
      }

      const validColor = product.colorCategory.some((c) => c.color === color);
      if (!validColor) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Invalid color for this product"
        );
      }
    } else if (color) {
      return errorResponse_BadRequest_WithMsg(
        res,
        "This product doesn't support color options"
      );
    }

    if (product.sizeCategory && product.sizeCategory.length > 0) {
      if (!size) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Size is required for this product"
        );
      }

      const validSize = product.sizeCategory.some((s) => s.size === size);
      if (!validSize) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Invalid size for this product"
        );
      }
    } else if (size) {
      return errorResponse_BadRequest_WithMsg(
        res,
        "This product doesn't support size options"
      );
    }

    const existingCart = user.cart || [];
    let found = false;

    for (let item of existingCart) {
      const sameProduct = item.product.toString() === productId;
      const sameColor = color ? item.color === color : !item.color;
      const sameSize = size ? item.size === size : !item.size;

      if (sameProduct && sameColor && sameSize) {
        item.count += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      user.cart.unshift({
        product: productId,
        color: color || undefined,
        size: size || undefined,
        count: 1,
      });
    }

    await user.save();

    const fromatedCart = await userCartFormater(user);
    return successResponse_ok(res, "Cart updated successfully", fromatedCart);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const removeFromCart = async (req: RequestType, res: Response) => {
  try {
    const user = req.user;
    const { productId } = req.body;
    const color = req.body.color || null;
    const size = req.body.size || null;

    const existingCart = user.cart || [];
    let found = false;
    let requiresAttributes = false;

    for (let i = 0; i < existingCart.length; i++) {
      const item = existingCart[i];
      const sameProduct = item.product.toString() === productId;

      if (sameProduct) {
        const hasColor = item.color !== null && item.color !== undefined;
        const hasSize = item.size !== null && item.size !== undefined;

        if ((hasColor && color === null) || (hasSize && size === null)) {
          requiresAttributes = true;
        }
      }

      const sameColor = color ? item.color === color : !item.color;
      const sameSize = size ? item.size === size : !item.size;

      if (sameProduct && sameColor && sameSize) {
        found = true;
        if (item.count > 1) {
          item.count -= 1;
        } else {
          existingCart.splice(i, 1);
        }
        break;
      }
    }

    if (requiresAttributes) {
      return errorResponse_BadRequest(res);
    }

    if (!found) {
      return errorResponse_NotFound(res, "Product not found in cart");
    }

    user.cart = existingCart;
    await user.save();

    const formatedCart = await userCartFormater(user);

    return successResponse_ok(res, "Item removed from cart", formatedCart);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const clearCart = async (req: RequestType, res: Response) => {
  try {
    const user = req.user;
    user.cart = [];
    await user.save();

    return successResponse_ok(
      res,
      "All Items from the Cart is deleted",
      user.cart
    );
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const placeOrderFromCart = async (req: RequestType, res: Response) => {
  try {
    const user = req.user;

    if (!user.cart || user.cart.length === 0) {
      return errorResponse_NotFound(res, "Cart is Empty");
    }
    let totalAmount = 0;
    await user.populate("cart.product");
    user.cart.forEach((item: any) => {
      const amount = item.count * item.product.price;
      totalAmount += amount;
    });

    const order = await orderModel.create({
      userId: user._id,
      products: user.cart,
      totalAmount,
      createdAt: new Date(),
    });

    user.order.unshift(order._id);
    user.cart = [];
    await user.save();

    const formatedOrder = await userOrderFormater(user);
    return successResponse_ok(res, "Order Placed", formatedOrder);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const placeOrderSingleItem = async (req: RequestType, res: Response) => {
  try {
    const user = req.user;
    const { productId } = req.body;
    const color = req.body.color || null;
    const size = req.body.size || null;

    const product = await productModel.findById(productId);
    if (!product) {
      return errorResponse_NotFound(res, "Product Not Found");
    }

    if (product.colorCategory && product.colorCategory.length > 0) {
      if (!color) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Color is required for this product"
        );
      }

      const validColor = product.colorCategory.some((c) => c.color === color);
      if (!validColor) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Invalid color for this product"
        );
      }
    } else if (color) {
      return errorResponse_BadRequest_WithMsg(
        res,
        "This product doesn't support color options"
      );
    }

    if (product.sizeCategory && product.sizeCategory.length > 0) {
      if (!size) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Size is required for this product"
        );
      }

      const validSize = product.sizeCategory.some((s) => s.size === size);
      if (!validSize) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Invalid size for this product"
        );
      }
    } else if (size) {
      return errorResponse_BadRequest_WithMsg(
        res,
        "This product doesn't support size options"
      );
    }

    const orderPrduct = {
      count: 1,
      product: productId,
      color,
      size,
    };
    if (!orderPrduct.color) delete orderPrduct.color;
    if (!orderPrduct.size) delete orderPrduct.size;

    const order = await orderModel.create({
      userId: user._id,
      products: [orderPrduct],
      totalAmount: product.price,
      createdAt: new Date(),
    });

    user.order.unshift(order._id);
    await user.save();

    const fromatedOrder = await userOrderFormater(user);
    return successResponse_created(
      res,
      "Order Placed successfully",
      fromatedOrder
    );
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const updateUserDetails = async (req: RequestType, res: Response) => {
  try {
    const { username, phone, address } = req.body;
    let user = req.user;

    if (username?.trim()) {
      user.username = username.trim();
    }

    if (phone?.trim()) {
      user.phone = phone.trim();
    }

    if (address?.trim()) {
      user.address = address.trim();
    }

    await user.save();
    const updatedCart = await userCartFormater(user);
    const updatedOrder = await userOrderFormater(user);
    const newUser = {
      ...user._doc,
      cart: updatedCart,
      order: updatedOrder,
    };
    delete newUser.__v;
    delete newUser.otp;

    return successResponse_ok(res, "User Details Updated", newUser);
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const fetchSingleProduct = async (req: RequestType, res: Response) => {
  try {
    const { productId } = req.query;
    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      return errorResponse_NotFound(res, "Product Not Found");
    }
    return successResponse_ok(
      res,
      "Product Fetched Successfully",
      product.toJSON()
    );
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const addToWishlist = async (req: RequestType, res: Response) => {
  try {
    const { productId, color } = req.body;
    const user = req.user;
    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      return errorResponse_NotFound(res, "Product Not Found");
    }
    if (product.colorCategory && product.colorCategory.length > 0) {
      if (!color) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Color is required for this product"
        );
      }

      const validColor = product.colorCategory.some((c) => c.color === color);
      if (!validColor) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Invalid color for this product"
        );
      }
    } else if (color) {
      return errorResponse_BadRequest_WithMsg(
        res,
        "This product doesn't support color options"
      );
    }
    const exists = user.wishlist.some(
      (item: { product: any; color: string }) =>
        item.product.toString() === productId && item.color === color
    );
    if (exists) {
      return errorResponse_AlreadyExists(res, "Product already in wishlist");
    } else {
      user.wishlist.push({ product: productId, color });
      await user.save();
      const formattedWishlist = await userWishlistFormater(user);
      return successResponse_ok(
        res,
        "Product added to wishlist",
        formattedWishlist
      );
    }
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};

export const removeFromWishlist = async (req: RequestType, res: Response) => {
  try {
    const { productId } = req.body;
    const color = req.body.color || null;
    const user = req.user;

    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      return errorResponse_NotFound(res, "Product Not Found");
    }

    if (product.colorCategory && product.colorCategory.length > 0) {
      if (!color) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Color is required for this product"
        );
      }
      const validColor = product.colorCategory.some((c) => c.color === color);
      if (!validColor) {
        return errorResponse_BadRequest_WithMsg(
          res,
          "Invalid color for this product"
        );
      }
    } else if (color) {
      return errorResponse_BadRequest_WithMsg(
        res,
        "This product doesn't support color options"
      );
    }

    const index = user.wishlist.findIndex(
      (item: { product: any; color?: string }) =>
        item.product.toString() === productId &&
        (product.colorCategory && product.colorCategory.length > 0
          ? item.color === color
          : !item.color)
    );

    if (index === -1) {
      return errorResponse_NotFound(res, "Product not found in wishlist");
    }

    user.wishlist.splice(index, 1);
    await user.save();
    const formattedWishlist = await userWishlistFormater(user);
    return successResponse_ok(
      res,
      "Product removed from wishlist",
      formattedWishlist
    );
  } catch (error) {
    return errorResponse_CatchBlock(res, error);
  }
};
