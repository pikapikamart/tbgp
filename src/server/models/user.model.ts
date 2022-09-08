import mongoose from "mongoose";


export type User = {
  email: string,
  password: string
}

export type UserDocument = User & mongoose.Document & {
  comparePassword: ( pasword: string ) => Promise<boolean>
}

export const userBaseModel = {
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