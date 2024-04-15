import express, { Router } from 'express';
import { MembershipController } from '../controllers/membershipController';

const router: Router = express.Router();


router.post('/memberships', MembershipController.addMembership);
router.get('/memberships', MembershipController.getMemberships);
router.delete('/memberships/:id', MembershipController.deleteMembership);
router.put('/memberships/:id', MembershipController.updateMembership);

export default router;
