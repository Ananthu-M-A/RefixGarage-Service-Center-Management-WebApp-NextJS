import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReceptionist extends Document {
    name: string;
    email: string;
    password: string;
}

const ReceptionistSchema: Schema<IReceptionist> = new Schema(
    {
        name: { type: String, required: true },         
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const Receptionist: Model<IReceptionist> = mongoose.models.Receptionist || mongoose.model<IReceptionist>('Receptionist', ReceptionistSchema);

export default Receptionist;
