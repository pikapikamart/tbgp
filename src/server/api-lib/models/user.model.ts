import mongoose from "mongoose";


export type User = {
  username: string,
  email: string,
  password: string
}

export type UserDocument = User & mongoose.Document & {
  comparePassword: ( pasword: string ) => Promise<boolean>
}

export const userBaseModel = {
  username: {
    type: String,
    required: true
  },
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