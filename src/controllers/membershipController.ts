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

  public static async deleteMembership(req: Request, res: Response): Promise<void> {
    try {
      const membershipId = req.params.id;
      const deletedMembership = await Membership.findByIdAndDelete(membershipId);
      if (!deletedMembership) {
        res.status(404).send("Membership not found.");
        return;
      }
      res.send(deletedMembership);
    } catch (error) {
      res.status(500).send("Error deleting membership.");
    }
  }

  public static async updateMembership(req: Request, res: Response): Promise<void> {
    try {
      const membershipId = req.params.id;
      const updatedMembership = await Membership.findByIdAndUpdate(membershipId, req.body, { new: true });
      if (!updatedMembership) {
        res.status(404).send("Membership not found.");
        return;
      }
      res.send(updatedMembership);
    } catch (error) {
      res.status(500).send("Error updating membership.");
    }
  }
}