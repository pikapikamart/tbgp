import { FilterQuery, UpdateQuery } from "mongoose";
import { 
  Admin, 
  AdminModel } from "../models/admin.model";


export const findAdmin = async( query: FilterQuery<Admin> ) => (
  AdminModel.findOne(query)
)

export const createAdmin = async( admin: Omit<Admin, "bastionIds" | "verifications"> ) => AdminModel.create(admin)

export const updateAdmin = async( update: UpdateQuery<Admin> ) => AdminModel.findOneAndUpdate({}, update)