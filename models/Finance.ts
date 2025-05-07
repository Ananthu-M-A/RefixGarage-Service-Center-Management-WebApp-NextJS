import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFinance extends Document {
    description: string;
    amount: number;
    type: "revenue" | "expenditure";
    date: string;
}

const FinanceSchema: Schema<IFinance> = new Schema(
    {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: ["revenue", "expenditure"], required: true },
    },
    { timestamps: true }
);

const Finance: Model<IFinance> = mongoose.models.Finance || mongoose.model<IFinance>('Finance', FinanceSchema);

export default Finance;