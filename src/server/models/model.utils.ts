import mongoose from "mongoose";
import { UserDocument } from "./shared.model";
import bcrypt from "bcrypt";


export const preHashModel = async function(
  this: UserDocument,
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