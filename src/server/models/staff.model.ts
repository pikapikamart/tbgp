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
import { PositionSchema } from "../schemas/staff.schema";
import { ArticleDocument } from "./article.model";


export type Role = "writer" | "sectionEditor" | "seniorEditor"
type RolesAndPosition = Record<Role, string[]>
type RolesAndPositionIndex = RolesAndPosition & {
  [ key: string ]: string[]
}

export type Position = PositionSchema
export type BastionId = string;

export type StoryRequests = {
  requested: StoryRequestDocument["_id"][],
  joined: StoryRequestDocument["_id"][],
  created: StoryRequestDocument["_id"][]
}

export type Writeups = {
  [ key: string ] : WriteupDocument["_id"][],
  solo: WriteupDocument["_id"][],
  collaborated: WriteupDocument["_id"][],
  task: WriteupDocument["_id"][]
}

export type Staff = BaseUser & {
  username: string,
  firstname: string,
  middlename?: string,
  lastname: string,
  bastionId: BastionId,
  verification: boolean,
  position: Position | null,
  bio: string,
  storyRequests: StoryRequests | null,
  writeups: Writeups | null,
  articles: ArticleDocument["_id"][] | null
}

export type VerifiedStaff = ModifyType<Staff, {
  position: Position,
  storyRequests: StoryRequests,
  writeups: Writeups
}>

export type StaffDocument = Staff & BaseUserDocument & {};
export type VerifiedStaffDocument = VerifiedStaff & BaseUserDocument

export const Roles: ["writer", "sectionEditor", "seniorEditor"] = [ "writer", "sectionEditor", "seniorEditor"]

export const rolesAndPosition: RolesAndPositionIndex = {
  writer: [
    "Junior Staff",
    "Senior Staff"
  ],
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
  middlename: String,
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
  },
  articles: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article", 
    }],
    default: null
  } 
})

staffSchema.pre("save", preHashModel);

staffSchema.methods.comparePassword = async function( password: string ) {
  return await modelComparePassword(this.password, password);
}

const StaffModel: mongoose.Model<StaffDocument> = mongoose.models?.Staff || mongoose.model<StaffDocument>("Staff", staffSchema);

export { StaffModel };