import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  menuItemId: mongoose.Types.ObjectId;
  quantity: number;
  priceAtOrder: number;
}

export type OrderStatus = 'received' | 'preparing' | 'out' | 'delivered';
export type PaymentMethod = 'cod' | 'online';
export type DeliveryType = 'delivery' | 'pickup';

export interface IOrder extends Document {
  orderId: string;
  userId?: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  deliveryFee: number;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  customerNotes?: string;
  paymentMethod: PaymentMethod;
  deliveryType: DeliveryType;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  menuItemId: {
    type: Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtOrder: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['received', 'preparing', 'out', 'delivered'],
      default: 'received',
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
    },
    customerNotes: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'online'],
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ['delivery', 'pickup'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
