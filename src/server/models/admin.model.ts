import mongoose from "mongoose";
import { 
  User,
  userBaseModel, 
  UserDocument } from "./user.model";
import { 
  modelComparePassword, 
  preHashModel } from "./utils";


type Verifications = {
  fullname: string,
  bastionId: string,
  position: string
}

export type Admin = User & {
  username: string,
  bastionIds: string[],
  verifications: Verifications[]
}

export type AdminDocument = Admin & UserDocument & {}

const adminSchema: mongoose.Schema<AdminDocument> = new mongoose.Schema({
  ...userBaseModel,
  username: {
    type: String,
    required: true
  },
  bastionIds: [ String ],
  verifications: [
    {
      fullname: String,
      bastionId: String,
      position: String
    }
  ]
})

adminSchema.pre("save", preHashModel);

adminSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const AdminModel: mongoose.Model<AdminDocument> = mongoose.models?.Admin || mongoose.model<AdminDocument>("Admin", adminSchema);

export { AdminModel };