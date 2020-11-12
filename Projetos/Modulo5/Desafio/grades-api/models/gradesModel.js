import mongoose from 'mongoose';

const gradesSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    subject: { type: String, require: true },
    type: { type: String, require: true },
    value: {
      type: Number,
      require: true,
      min: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const gradeModel = mongoose.model('grades', gradesSchema);

export default gradeModel;
