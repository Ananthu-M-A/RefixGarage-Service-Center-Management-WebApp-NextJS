import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomer extends Document {
    customerId: string;
    name: string;
    mobile: string;
    createdAt: Date;
}

const CustomerSchema: Schema<ICustomer> = new Schema(
    {
        customerId: { type: String, required: true },
        name: { type: String, required: true },
        mobile: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
