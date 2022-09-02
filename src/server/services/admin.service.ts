import { 
  Admin, 
  AdminModel } from "../models/admin.model";


export const getAdmin = async() => AdminModel.findOne()

export const createAdmin = async( admin: Omit<Admin, "bastionIds" | "verifications"> ) => AdminModel.create(admin)