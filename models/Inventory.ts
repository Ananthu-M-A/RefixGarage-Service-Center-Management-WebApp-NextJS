import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInventory extends Document {
    itemId: string;
    name: string;
    description?: string;
    quantity: number;
    category: string;
    price: number;
    createdAt: Date;
}

const InventorySchema: Schema<IInventory> = new Schema(
  {
    itemId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Inventory: Model<IInventory> = mongoose.models.Inventory || mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;
