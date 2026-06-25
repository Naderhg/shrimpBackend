import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  categoryId: mongoose.Types.ObjectId;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  price: number;
  image: string;
  isAvailable: boolean;
  unavailableInBranches?: mongoose.Types.ObjectId[];
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    unavailableInBranches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
