import { Router, Request, Response } from 'express';
import { getMarketDataFor, INDIAN_STATES, DISTRICT_MAP, BUSINESS_CATEGORIES } from '../../src/data/demoMarkets';

const router = Router();

// GET /api/market/meta
router.get('/meta', (req: Request, res: Response) => {
  res.json({
    success: true,
    states: INDIAN_STATES,
    districts: DISTRICT_MAP,
    categories: BUSINESS_CATEGORIES
  });
});

// GET /api/market/analysis
router.get('/analysis', (req: Request, res: Response) => {
  const state = (req.query.state as string) || 'West Bengal';
  const district = (req.query.district as string) || 'Nadia';
  const category = (req.query.category as string) || 'All Categories';

  const data = getMarketDataFor(state, district, category);
  res.json({ success: true, market: data });
});

export default router;
