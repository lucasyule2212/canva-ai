import { Document, Schema, model, models } from "mongoose";

export interface ITransaction extends Document {
  _id: string;
  stripeId: string;
  amount: number;
  plan: string;
  credits: number;
  buyer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema = new Schema({
  _id: { type: String, required: true },
  stripeId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  credits: { type: Number, required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Transaction = models?.transaction || model('Transaction', TransactionSchema);

export default Transaction;