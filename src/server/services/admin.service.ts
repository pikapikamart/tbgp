import "../models"
import { 
  FilterQuery, 
  ProjectionType, 
  UpdateQuery } from "mongoose";
import { 
  Admin, 
  AdminModel } from "../models/admin.model";


export const findAdminService = async( 
  query: FilterQuery<Admin>,
  projection: ProjectionType<Admin> = ""
) => (
  AdminModel.findOne(query, projection)
)

export const createAdminService = async( admin: Omit<Admin, "bastionIds" | "verifications"> ) => AdminModel.create(admin)

export const updateAdminService = async( update: UpdateQuery<Admin> ) => AdminModel.findOneAndUpdate({}, update)