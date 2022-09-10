import { DocumentDefinition } from "mongoose";
import { 
  Writeup, 
  WriteupModel } from "../models/writeup.model";


export const createWriteup = async( writeup: DocumentDefinition<Writeup> ) => (
  WriteupModel.create(writeup)
)