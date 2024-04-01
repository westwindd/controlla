import express, { Router } from 'express';
import { MembershipController } from '../controllers/membershipController';

const router: Router = express.Router();

router.post('/', MembershipController.addMembership);
router.get('/', MembershipController.getMemberships);

export default router;
