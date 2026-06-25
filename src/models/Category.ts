import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: {
    ar: string;
    en: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>('Category', CategorySchema);
