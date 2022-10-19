import mongoose from "mongoose";


export type BaseUser = {
  email: string,
  password: string
}

export type BaseUserDocument = BaseUser & mongoose.Document<mongoose.Types.ObjectId> & {
  _id: mongoose.Types.ObjectId,
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