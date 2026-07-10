import { Request, Response } from 'express';
import Lead from '../models/Lead';

export const getLenderLeads = async (req: Request | any, res: Response) => {
  try {
    // Assuming the lender ID is somehow associated with the logged-in user.
    // For now, we expect lenderId to be in the user token or query
    const lenderId = req.user.lenderId || req.query.lenderId; 
    
    if (!lenderId) {
      return res.status(400).json({ message: 'Lender ID is required' });
    }

    const leads = await Lead.find({ lenderId })
      .populate('applicationId');
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
