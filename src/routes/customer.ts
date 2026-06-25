import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  createReview,
  getMyReviews,
} from '../controllers/customerController';
import { auth } from '../middleware/auth';

const router = Router();

// Orders - create order is public (guests can order)
router.post('/orders', createOrder);

// Other order routes require authentication
router.use(auth);
router.get('/orders', getMyOrders);
router.get('/orders/:id', getOrderById);

// Reviews require authentication
router.post('/reviews', createReview);
router.get('/reviews/my', getMyReviews);

export default router;
