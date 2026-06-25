import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  branchId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  customerName: string;
  rating: number;
  comment: {
    ar: string;
    en: string;
  };
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    customerName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReview>('Review', ReviewSchema);
