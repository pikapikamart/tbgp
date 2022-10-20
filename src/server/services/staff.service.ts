import "../models"
import { 
  DocumentDefinition, 
  FilterQuery, 
  PopulateOptions, 
  ProjectionType, 
  QueryOptions, 
  UpdateQuery} from "mongoose";
import { 
  Staff, 
  StaffDocument, 
  StaffModel } from "../models/staff.model";


export const findStaffService = async( 
  query: FilterQuery<Staff>,
  projection: ProjectionType<Staff> = {},
  options: QueryOptions = { lean: true } ,
  populate?: PopulateOptions
) => (
  populate? StaffModel.findOne(query, projection, options).populate(populate) : StaffModel.findOne(query, projection, options)
)

export const createStaffService = async( staff: DocumentDefinition<Staff> ) => (
  StaffModel.create(staff)
)

export const updateStaffService = async(
  query: FilterQuery<Staff>, 
  update: UpdateQuery<Staff> 
) => (
  StaffModel.findOneAndUpdate(query, update)
)

export const bulkUpdateStaffService = async( input: any ) => (
  StaffModel.bulkWrite(input)
)

export const staffPopulatorService = async( 
  staff: StaffDocument,
  populate: PopulateOptions
) => (
  await staff.populate(populate)
)

export const findManyStaffsService = async( 
  query: FilterQuery<Staff>,
  projection: ProjectionType<Staff> = {},
  options: QueryOptions = { lean: true } 
) => (
  StaffModel.find(query, projection, options)
)