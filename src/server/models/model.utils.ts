import mongoose from "mongoose";
import { BaseUserDocument } from "./base.user.model";
import bcrypt from "bcrypt";


export const preHashModel = async function(
  this: BaseUserDocument,
  next: mongoose.CallbackWithoutResultAndOptionalError
) {
  if ( !this.isModified("password") ) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  return next();
}

export const modelComparePassword = async(
  hashedPassword: string,
  password: string
): Promise<boolean> => {

  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch( error ) {
    return false;
  }
}

export const convertToObjectId = ( id: string ) => {
  return new mongoose.Types.ObjectId(id)
}