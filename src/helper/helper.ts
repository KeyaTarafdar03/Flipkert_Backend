import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const generateToken = (email: String, id: String) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY || "", {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_KEY || "");
};

export const passwordHashing = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const passwordChecking = async (
  password: string,
  hashedPassword: string
) => {
  let result = await bcrypt.compare(password, hashedPassword);
  return result;
};
