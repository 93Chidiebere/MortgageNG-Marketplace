import { Request, Response } from 'express';
import Lender from '../models/Lender';

export const getLenders = async (req: Request, res: Response) => {
  try {
    const lenders = await Lender.find({ isActive: true });
    res.json(lenders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLenderById = async (req: Request, res: Response) => {
  try {
    const lender = await Lender.findById(req.params.id);
    if (!lender) {
      return res.status(404).json({ message: 'Lender not found' });
    }
    res.json(lender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
