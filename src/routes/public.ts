import { Router } from 'express';
import {
  getBranches,
  getBranchById,
  getCategories,
  getMenuItems,
  getMenuItemById,
  getFeaturedItems,
  getApprovedReviews,
  getPublicSettings,
} from '../controllers/publicController';

const router = Router();

// Branches
router.get('/branches', getBranches);
router.get('/branches/:id', getBranchById);

// Categories
router.get('/categories', getCategories);

// Menu Items
router.get('/menu', getMenuItems);
router.get('/menu/:id', getMenuItemById);
router.get('/menu/featured', getFeaturedItems);

// Reviews
router.get('/reviews', getApprovedReviews);

// Settings
router.get('/settings', getPublicSettings);

export default router;
