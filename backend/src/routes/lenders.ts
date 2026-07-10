import { Router } from 'express';
import { getLenders, getLenderById } from '../controllers/lenderController';

const router = Router();

router.get('/', getLenders);
router.get('/:id', getLenderById);

export default router;
