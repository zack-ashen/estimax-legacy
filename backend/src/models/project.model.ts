import mongoose, { Schema, Types } from "mongoose";
import { ProjectStatus } from "../types";

export interface IProject {
  id: Types.ObjectId;
  name: string;
  property: Types.ObjectId;
  expirationDate: Date;
  dynamicBidding: boolean;
  public: boolean;
  description: string;
  status: ProjectStatus;
}

const projectSchema = new Schema<IProject>(
  {
    name: String,
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    expirationDate: Date,
    dynamicBidding: Boolean,
    public: Boolean,
    description: String,
    status: {
      type: String,
      enum: ProjectStatus,
      default: ProjectStatus.IN_PROGRESS,
    },
  },
  {
    toObject: {
      virtuals: true,
      transform: function (_, ret) {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

projectSchema.virtual("id").get(function () {
  return this._id;
});

export const Project = mongoose.model<IProject>("Project", projectSchema);
