import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    synced: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model("Notes", noteSchema);
