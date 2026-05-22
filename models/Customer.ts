import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    mobile: string | null;
    jobs: Types.ObjectId[];
}

const CustomerSchema: Schema<ICustomer> = new Schema(
    {
        name: { type: String, required: true },
        mobile: { type: String, required: false, unique: true, default: null, sparse: true },
        jobs: [{ type: Schema.Types.ObjectId, required: false, ref: 'Job' }],
    },
    { timestamps: true }
);

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
