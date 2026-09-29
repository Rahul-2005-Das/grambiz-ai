import { Router, Request, Response } from 'express';
import { DEMO_BUSINESS_IDEAS } from '../../src/data/demoBusinesses';

const router = Router();

// In-memory / modular storage for prototype businesses
let userBusinessPlans: Record<string, any> = {};

// GET /api/business/ideas - returns catalog of business ideas
router.get('/ideas', (req: Request, res: Response) => {
  const category = req.query.category as string;
  const maxCapital = req.query.maxCapital ? Number(req.query.maxCapital) : undefined;

  let ideas = DEMO_BUSINESS_IDEAS;
  if (category && category !== 'All Categories') {
    ideas = ideas.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }
  if (maxCapital) {
    ideas = ideas.filter(i => i.minInvestment <= maxCapital);
  }

  res.json({ success: true, count: ideas.length, ideas });
});

// GET /api/business/ideas/:id
router.get('/ideas/:id', (req: Request, res: Response) => {
  const idea = DEMO_BUSINESS_IDEAS.find(i => i.id === req.params.id);
  if (!idea) {
    return res.status(404).json({ error: 'Business idea not found' });
  }
  res.json({ success: true, idea });
});

// POST /api/business/plan/save
router.post('/plan/save', (req: Request, res: Response) => {
  const { userId = 'default_user', plan } = req.body;
  if (!plan) {
    return res.status(400).json({ error: 'Plan data required' });
  }
  userBusinessPlans[userId] = {
    ...plan,
    updatedAt: new Date().toISOString()
  };
  res.json({ success: true, message: 'Plan saved successfully' });
});

// GET /api/business/plan/:userId
router.get('/plan/:userId', (req: Request, res: Response) => {
  const plan = userBusinessPlans[req.params.userId];
  if (!plan) {
    return res.json({ success: true, plan: null });
  }
  res.json({ success: true, plan });
});

export default router;
