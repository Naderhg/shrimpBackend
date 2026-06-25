import { Request, Response } from 'express';
import Branch from '../models/Branch';
import MenuItem from '../models/MenuItem';
import Category from '../models/Category';
import Review from '../models/Review';
import Settings from '../models/Settings';

// Branches
export const getBranches = async (req: Request, res: Response): Promise<void> => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    res.json(branches);
  } catch (error) {
    console.error('Get branches error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      res.status(404).json({ error: 'Branch not found' });
      return;
    }
    res.json(branch);
  } catch (error) {
    console.error('Get branch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Menu Items
export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, branchId } = req.query;
    
    let query: any = { isAvailable: true };
    
    if (categoryId) {
      query.categoryId = categoryId;
    }
    
    let items = await MenuItem.find(query).populate('categoryId').sort({ createdAt: -1 });
    
    // Filter items unavailable in specific branch
    if (branchId) {
      items = items.filter(item => 
        !item.unavailableInBranches?.map(id => id.toString()).includes(branchId as string)
      );
    }
    
    res.json(items);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMenuItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await MenuItem.findById(req.params.id).populate('categoryId');
    if (!item) {
      res.status(404).json({ error: 'Menu item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeaturedItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId } = req.query;
    
    let items = await MenuItem.find({ 
      featured: true, 
      isAvailable: true 
    }).populate('categoryId').sort({ createdAt: -1 });
    
    // Filter items unavailable in specific branch
    if (branchId) {
      items = items.filter(item => 
        !item.unavailableInBranches?.map(id => id.toString()).includes(branchId as string)
      );
    }
    
    res.json(items);
  } catch (error) {
    console.error('Get featured items error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reviews
export const getApprovedReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId } = req.query;

    let query: any = { isApproved: true };

    if (branchId) {
      query.branchId = branchId;
    }

    const reviews = await Review.find(query).sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Settings
export const getPublicSettings = async (req: Request, res: Response): Promise<void> => {
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
