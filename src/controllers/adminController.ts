import { Request, Response } from 'express';
import Branch from '../models/Branch';
import MenuItem from '../models/MenuItem';
import Category from '../models/Category';
import Order from '../models/Order';
import Review from '../models/Review';
import User from '../models/User';
import Settings from '../models/Settings';
import { AuthRequest } from '../middleware/auth';

// Branches
export const createBranch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    res.status(201).json(branch);
  } catch (error) {
    console.error('Create branch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateBranch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!branch) {
      res.status(404).json({ error: 'Branch not found' });
      return;
    }
    res.json(branch);
  } catch (error) {
    console.error('Update branch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteBranch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) {
      res.status(404).json({ error: 'Branch not found' });
      return;
    }
    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error('Delete branch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Categories
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Menu Items
export const createMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) {
      res.status(404).json({ error: 'Menu item not found' });
      return;
    }
    res.json(menuItem);
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteMenuItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      res.status(404).json({ error: 'Menu item not found' });
      return;
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Orders
export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate('branchId')
      .populate('userId')
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('branchId')
      .populate('userId')
      .populate('items.menuItemId');
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('branchId').populate('items.menuItemId');
    
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reviews
export const getAllReviews = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find()
      .populate('branchId')
      .populate('userId')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const approveReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('branchId');
    
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    
    res.json(review);
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Users
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Settings
export const getSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
      await settings.save();
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
