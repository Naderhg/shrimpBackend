import mongoose, { Document, Schema } from 'mongoose';

export interface IBranch extends Document {
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  phone: string;
  hours: {
    ar: string;
    en: string;
  };
  zone: {
    ar: string;
    en: string;
  };
  deliveryFee: number;
  etaMinutes: number;
  rating: number;
  isOpen: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    address: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    phone: {
      type: String,
      required: true,
    },
    hours: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    zone: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    etaMinutes: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBranch>('Branch', BranchSchema);
