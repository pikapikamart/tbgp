import mongoose from "mongoose";
import { 
  modelComparePassword, 
  preHashModel } from "./model.utils";
import { 
  BastionId, 
  Position } from "./staff.model";
import { 
  baseUserModel, 
  BaseUserDocument } from "./base.user.model";


export type Verification = {
  fullname: string,
  bastionId: BastionId,
  position: Position
}

export type Admin = {
  username: string,
  email: string,
  password: string,
  bastionIds: BastionId[],
  verifications: Verification[]
}

export type AdminDocument = Admin & BaseUserDocument & {}

const adminSchema: mongoose.Schema<AdminDocument> = new mongoose.Schema({
  ...baseUserModel,
  username: {
    type: String,
    required: true
  },
  bastionIds: [ String ],
  verifications: [
    {
      fullname: String,
      bastionId: String,
      position: {
        name: String,
        role: String
      },
    }
  ]
})

adminSchema.pre("save", preHashModel);

adminSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const AdminModel: mongoose.Model<AdminDocument> = mongoose.models?.Admin || mongoose.model<AdminDocument>("Admin", adminSchema);

export { AdminModel };