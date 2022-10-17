import mongoose from "mongoose";

const severitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    color: {
      type: String,
      default: "#D6DBDF",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Severity", severitySchema);
