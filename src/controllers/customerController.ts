import { Request, Response } from 'express';
import Order from '../models/Order';
import Review from '../models/Review';
import MenuItem from '../models/MenuItem';
import Branch from '../models/Branch';
import { AuthRequest } from '../middleware/auth';

// Orders
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      branchId,
      items,
      total,
      deliveryFee,
      customerName,
      customerPhone,
      customerAddress,
      customerNotes,
      paymentMethod,
      deliveryType,
    } = req.body;

    // Validate branch
    const branch = await Branch.findById(branchId);
    if (!branch) {
      res.status(404).json({ error: 'Branch not found' });
      return;
    }

    // Validate menu items and get current prices
    const validatedItems = [];
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        res.status(404).json({ error: `Menu item ${item.menuItemId} not found` });
        return;
      }
      if (!menuItem.isAvailable) {
        res.status(400).json({ error: `Menu item ${menuItem.name.en} is not available` });
        return;
      }
      validatedItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        priceAtOrder: menuItem.price,
      });
    }

    // Generate order ID
    const orderId = `SZ-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = new Order({
      orderId,
      userId: req.userId,
      branchId,
      items: validatedItems,
      total,
      deliveryFee,
      status: 'received',
      customerName,
      customerPhone,
      customerAddress,
      customerNotes,
      paymentMethod,
      deliveryType,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('branchId')
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
      .populate('branchId')
      .populate('items.menuItemId');
    
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Check if user owns this order or is admin
    if (order.userId?.toString() !== req.userId && req.userRole !== 'admin') {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reviews
export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { branchId, rating, comment } = req.body;

    // Validate branch
    const branch = await Branch.findById(branchId);
    if (!branch) {
      res.status(404).json({ error: 'Branch not found' });
      return;
    }

    const review = new Review({
      branchId,
      userId: req.userId,
      customerName: req.body.customerName || 'Anonymous',
      rating,
      comment,
      isApproved: false, // Requires admin approval
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyReviews = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ userId: req.userId })
      .populate('branchId')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
