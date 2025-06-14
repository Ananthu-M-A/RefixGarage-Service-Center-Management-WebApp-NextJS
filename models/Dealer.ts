import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDealer extends Document {
    type: string;
    name: string;
}

const DealerSchema: Schema<IDealer> = new Schema(
    {
        type: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const Dealer: Model<IDealer> = mongoose.models.Dealer || mongoose.model<IDealer>('Dealer', DealerSchema);

export default Dealer;