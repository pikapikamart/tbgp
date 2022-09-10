import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Staff, 
  StaffDocument, 
  StaffModel } from "../models/staff.model";


export const findStaff = async( 
  query: FilterQuery<Staff>,
  projection: ProjectionType<Staff> = {},
  options: QueryOptions = { lean: true } 
) => (
  StaffModel.findOne(query, projection, options)
)

export const createStaff = async( staff: DocumentDefinition<Staff> ) => (
  StaffModel.create(staff)
)

export const updateStaff = async(
  query: FilterQuery<StaffDocument>, 
  update: UpdateQuery<StaffDocument> 
) => (
  StaffModel.findOneAndUpdate(query, update)
)

export const bulkUpdateStaff = async( input: any ) => (
  StaffModel.bulkWrite(input)
)