import mongoose, { Schema, Types } from "mongoose";
import mediaService from "../services/media.service";
import { ProjectStatus } from "../types";
import { Media, MediaSchema } from "./sub-schema/media";

export interface IProject {
  id: Types.ObjectId;
  name: string;
  property: Types.ObjectId;
  expirationDate: Date;
  dynamicBidding: boolean;
  media: Media[];
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
    media: [{ type: MediaSchema, default: [] }],
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
        ret.media = ret.media.map(async (media: Media) => {
          {
            media.accessString = await mediaService.generatePresignedUrl(
              media.accessString
            );
          }
        });
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
