import { Request, Response } from 'express';
import Membership from '../models/Membership';

export class MembershipController {
  public static async addMembership(req: Request, res: Response): Promise<void> {
    try {
      const membership = new Membership(req.body);
      const result = await membership.save();
      res.send(result);
    } catch (error) {
      res.status(500).send("Error adding membership.");
    }
  }

  public static async getMemberships(req: Request, res: Response): Promise<void> {
    try {
      const memberships = await Membership.find();
      res.send(memberships);
    } catch (error) {
      res.status(500).send("Error fetching memberships.");
    }
  }
}
