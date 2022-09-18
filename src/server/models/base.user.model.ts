import mongoose from "mongoose";


export type BaseUser = {
  email: string,
  password: string
}

export type BaseUserDocument = BaseUser & mongoose.Document & {
  comparePassword: ( pasword: string ) => Promise<boolean>
}

export const baseUserModel = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}