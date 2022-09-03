import { UpdateQuery } from "mongoose";
import { 
  Admin, 
  AdminModel } from "../models/admin.model";


export const getAdmin = async() => AdminModel.findOne()

export const createAdmin = async( admin: Omit<Admin, "bastionIds" | "verifications"> ) => AdminModel.create(admin)

export const updateAdmin = async( update: UpdateQuery<Admin> ) => AdminModel.findOneAndUpdate({}, update)