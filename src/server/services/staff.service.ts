import { 
  DocumentDefinition, 
  FilterQuery, 
  QueryOptions } from "mongoose";
import { Staff, StaffModel } from "../models/staff.model";


export const findStaff = async( 
  query: FilterQuery<Staff>,
  options: QueryOptions = { lean: true } 
) => (
  StaffModel.findOne(query, options)
)

export const createStaff = async( staff: DocumentDefinition<Staff> ) => (
  StaffModel.create(staff)
)