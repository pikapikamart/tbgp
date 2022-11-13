import mongoose from "mongoose"
import { StaffDocument } from "./staff.model"
import { WriteupDocument } from "./writeup.model"


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
  thumbnail: {
    small: string,
    medium: string
  },
  content: any[],
  writeup: WriteupDocument["_id"],
  views: number,
  viewsId: string[]
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
    ref: "Staff"
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
      type: String
    }
  },
  thumbnail: {
    small: String,
    medium: String,
  },
  content: [],
  writeup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Writeup"
  },
  views: {
    type: Number,
    default: 0
  },
  viewsId: [String]
}, { timestamps: true })

const ArticleModel: mongoose.Model<ArticleDocument> = mongoose.models.Article || mongoose.model<ArticleDocument>("Article", articleSchema)

export { ArticleModel }