import { Router } from 'express';
import {
  createBranch,
  updateBranch,
  deleteBranch,
  createCategory,
  updateCategory,
  deleteCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getAllReviews,
  approveReview,
  deleteReview,
  getAllUsers,
  getSettings,
  updateSettings,
} from '../controllers/adminController';
import { adminAuth } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\\s+/g, '-')}`);
  },
});

const upload = multer({ storage });

// All admin routes require admin authentication
router.use(adminAuth);

// Upload image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Branches
router.post('/branches', createBranch);
router.put('/branches/:id', updateBranch);
router.delete('/branches/:id', deleteBranch);

// Categories
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Menu Items
router.post('/menu', createMenuItem);
router.put('/menu/:id', updateMenuItem);
router.delete('/menu/:id', deleteMenuItem);

// Orders
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/status', updateOrderStatus);

// Reviews
router.get('/reviews', getAllReviews);
router.put('/reviews/:id/approve', approveReview);
router.delete('/reviews/:id', deleteReview);

// Users
router.get('/users', getAllUsers);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;
