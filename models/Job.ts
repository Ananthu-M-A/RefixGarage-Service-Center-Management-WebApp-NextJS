import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJob extends Document {
  jobId: string;
  customerId: string;
  engineerId?: string;
  device: string;
  cost: number;
  reminder: number;
  issue: string;
  remarks?: string;
  dateOfJobEntry: Date;
  dateOfJobCompletion?: Date;
  solution?: string;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    jobId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    engineerId: { type: String, required: false },
    device: { type: String, required: true },
    cost: { type: Number, required: true },
    reminder: { type: Number, required: true },
    issue: { type: String, required: true },
    remarks: { type: String, required: false },
    dateOfJobEntry: { type: Date, default: Date.now },
    dateOfJobCompletion: { type: Date, required: false },
    solution: { type: String, required: false },
  },
  { timestamps: true }
);

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default Job;
