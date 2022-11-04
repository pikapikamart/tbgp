import mongoose from "mongoose"
import { StaffDocument } from "./staff.model"


export type Article = {
  category: string,
  linkPath: string,
  authors: StaffDocument["_id"][],
  title: string,
  caption: string,
  banner: {
    url: string,
    caption: string
  },
  content: any[],
}

export type ArticleDocument = Article & mongoose.Document<mongoose.Types.ObjectId> & {
  createdAt: Date,
  updatedAt: Date
}

const articleSchema: mongoose.Schema<ArticleDocument> = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  linkPath: {
    type: String,
    required: true
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "staff"
  }],
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  banner: {
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    }
  },
  content: []
}, { timestamps: true })

const ArticleModel: mongoose.Model<ArticleDocument> = mongoose.models.Article || mongoose.model<ArticleDocument>("Article", articleSchema)

export { ArticleModel }