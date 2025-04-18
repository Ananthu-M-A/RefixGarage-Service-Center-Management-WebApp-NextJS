import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExpense extends Document {
    type: string;
    amount: number;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
    {
        type: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;