import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      default: 15000,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);
