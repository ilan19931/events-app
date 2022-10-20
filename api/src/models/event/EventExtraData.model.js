import mongoose from "mongoose";

const eventExtraData = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EventExtraData", eventExtraData);
