import mongoose from "mongoose";
import { 
  User, 
  userBaseModel, 
  UserDocument } from "./user.model";
import { 
  modelComparePassword, 
  preHashModel } from "./utils";


export type Staff = User & {
  firstname: string,
  lastname: string,
  bastionId: string,
  requests: {
    verification: boolean
  },
  bio?: string
}

export type StaffDocument = Staff & UserDocument & {};

const staffSchema: mongoose.Schema<StaffDocument> = new mongoose.Schema({
  ...userBaseModel,
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  bastionId: {
    type: String,
    required: true
  },
  requests: {
    verification: Boolean
  },
  bio: String
})

staffSchema.pre("save", preHashModel);

staffSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const StaffModel: mongoose.Model<StaffDocument> = mongoose.models?.Staff || mongoose.model<StaffDocument>("Staff", staffSchema);

export { StaffModel };