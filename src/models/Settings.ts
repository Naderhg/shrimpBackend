import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  taxEnabled: boolean;
  taxRate: number; // 14% by default
  governmentZones: Array<{
    _id?: string;
    name: {
      ar: string;
      en: string;
    };
    deliveryFee: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    taxEnabled: {
      type: Boolean,
      default: false,
    },
    taxRate: {
      type: Number,
      default: 14,
      min: 0,
      max: 100,
    },
    governmentZones: [
      {
        name: {
          ar: { type: String, required: true },
          en: { type: String, required: true },
        },
        deliveryFee: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
SettingsSchema.pre('save', async function () {
  const count = await mongoose.model('Settings').countDocuments();
  if (count >= 1 && this.isNew) {
    throw new Error('Only one settings document is allowed');
  }
});

export default mongoose.model<ISettings>('Settings', SettingsSchema);
