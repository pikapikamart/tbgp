import mongoose from "mongoose";
import { StoryRequestDocument } from "./story.request.model";
import { 
  modelComparePassword, 
  preHashModel } from "./model.utils";
import { WriteupDocument } from "./writeup.model";
import { 
  BaseUser, 
  BaseUserDocument, 
  baseUserModel} from "./base.user.model";
import { ModifyType } from "types/utils";


export type Role = "writer" | "sectionEditor" | "seniorEditor"
type RolesAndPosition = Record<Role, string[]>
type RolesAndPositionIndex = RolesAndPosition & {
  [ key: string ]: string[]
}

export type Position = {
  name: string,
  role: Role
}

export type BastionId = string;

export type StoryRequests = {
  requested: StoryRequestDocument["_id"][],
  joined: StoryRequestDocument["_id"][],
  created: StoryRequestDocument["_id"][]
}

export type Writeups = {
  solo: WriteupDocument["_id"][],
  collaborated: WriteupDocument["_id"][],
  task: WriteupDocument["_id"][]
}

export type Staff = BaseUser & {
  username: string,
  firstname: string,
  lastname: string,
  bastionId: BastionId,
  verification: boolean,
  position: Position | null,
  bio: string,
  storyRequests: StoryRequests | null,
  writeups: Writeups | null,
}

export type StaffDocument = Staff & BaseUserDocument & {};
export type VerifiedStaffDocument = ModifyType<Staff, {
  position: Position,
  storyRequests: StoryRequests,
  writeups: Writeups
}> & BaseUserDocument

export const Roles: ["writer", "sectionEditor", "seniorEditor"] = [ "writer", "sectionEditor", "seniorEditor"]

export const rolesAndPosition: RolesAndPositionIndex = {
  writer: ["Writer"],
  sectionEditor: [
    "News Editor",
    "Features Editor",
    "Literary Editor",
    "DevComm Editor",
    "Sports Editor",
    "Layout Editor"
  ],
  seniorEditor: [
    "Editor in Chief",
    "Associate Editor",
    "Managing Editor",
  ],
}

const staffSchema: mongoose.Schema<StaffDocument> = new mongoose.Schema({
  ...baseUserModel,
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  bastionId: {
    type: String,
    required: true
  },
  verification: Boolean,
  position: {
    type: {
      name: String,
      role: String
    },
    default: null
  },
  bio: String,
  storyRequests: {
    type: {
      requested: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "StoryRequest"
      }],
      joined: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "StoryRequest"
      }],
      created: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "StoryRequest"
      }]
    },
    default: null
  },
  writeups: {
    type: {
      solo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writeup"
      }],
      collaborated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writeup"
      }],
      task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Writeup"
      }]
    },
    default: null
  }
})

staffSchema.pre("save", preHashModel);

staffSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const StaffModel: mongoose.Model<StaffDocument> = mongoose.models?.Staff || mongoose.model<StaffDocument>("Staff", staffSchema);

export { StaffModel };