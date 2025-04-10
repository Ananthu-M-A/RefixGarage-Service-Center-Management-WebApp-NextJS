import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInventory extends Document {
    name: string;
    description?: string;
    count: number;
    category: string;
    cost: number;
  }

const InventorySchema: Schema<IInventory> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    count: { type: Number, required: true },
    category: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

const Inventory: Model<IInventory> = mongoose.models.Inventory || mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;
