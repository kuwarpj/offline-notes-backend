import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    synced: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model("Notes", noteSchema);
