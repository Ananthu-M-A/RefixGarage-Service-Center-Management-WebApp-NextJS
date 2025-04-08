import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    password: string;
    createdAt: Date;
}

const AdminSchema: Schema<IAdmin> = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
