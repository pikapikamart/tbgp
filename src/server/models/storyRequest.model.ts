// import mongoose from "mongoose";
// import { StaffDocument } from "./staff.model";


// export type StoryRequest = {
//   title: string,
//   instruction: string,
//   assigned: boolean,
//   started: boolean,
//   members: StaffDocument["_id"][],
//   owner: StaffDocument["_id"]
// };

// export type StoryRequestDocument = StoryRequest & mongoose.Document & {
//   createdAt: Date
// }

// const storyRequestSchema: mongoose.Schema<StoryRequestDocument> = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   instruction: {
//     type: String,
//     required: true
//   },
//   assigned: Boolean,
//   started: Boolean,
//   members: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Staff"
//   }],
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Staff",
//     required: true
//   }
// }, { timestamps: true });

// const StoryRequestModel: mongoose.Model<StoryRequestDocument> = mongoose.models?.StoryRequest || mongoose.model<StoryRequestDocument>("StoryRequest", storyRequestSchema);

// export { StoryRequestModel };