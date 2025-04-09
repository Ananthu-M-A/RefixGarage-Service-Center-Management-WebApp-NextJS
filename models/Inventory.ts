import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInventory extends Document {
    name: string;
    description?: string;
    quantity: number;
    category: string;
    price: number;
  }

const InventorySchema: Schema<IInventory> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Inventory: Model<IInventory> = mongoose.models.Inventory || mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;
