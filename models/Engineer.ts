import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEngineer extends Document {
    engineerId: string;
    name: string;
    email: string;
    createdAt: Date;
}

const EngineerSchema: Schema<IEngineer> = new Schema(
    {
        engineerId: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Engineer: Model<IEngineer> = mongoose.models.Engineer || mongoose.model<IEngineer>('Engineer', EngineerSchema);

export default Engineer;
