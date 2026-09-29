import { Router, Request, Response } from 'express';
import {
  generateBusinessAdvice,
  generateBusinessRecommendations,
  generateFinancialInsights,
  generateBusinessPlan,
  generateBusinessHealthAdvice,
  handleMultiTurnChat
} from '../services/geminiService';

const router = Router();

// POST /api/ai/chat (Multi-turn conversational chatbot)
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages, roleMode, language, userProfile } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }
    const result = await handleMultiTurnChat({ messages, roleMode, language, userProfile });
    return res.json(result);
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// POST /api/ai/advisor
router.post('/advisor', async (req: Request, res: Response) => {
  try {
    const { question, language, userProfile } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question string is required' });
    }
    const result = await generateBusinessAdvice({ question, language, userProfile });
    return res.json(result);
  } catch (error: any) {
    console.error('Advisor route error:', error);
    return res.status(500).json({ error: 'Failed to process advisory request' });
  }
});

// POST /api/ai/business-recommendations
router.post('/business-recommendations', async (req: Request, res: Response) => {
  try {
    const { location, capital, skills, hasSpace, workPref, language } = req.body;
    const result = await generateBusinessRecommendations({
      location: location || { state: 'West Bengal', district: 'Nadia' },
      capital: Number(capital) || 25000,
      skills: Array.isArray(skills) ? skills : [],
      hasSpace: hasSpace ?? 'not_sure',
      workPref: workPref || 'full_time',
      language: language || 'en'
    });
    return res.json(result);
  } catch (error: any) {
    console.error('Recommendations route error:', error);
    return res.status(500).json({ error: 'Failed to generate business ideas' });
  }
});

// POST /api/ai/financial-insight
router.post('/financial-insight', async (req: Request, res: Response) => {
  try {
    const { financialPlan, language } = req.body;
    if (!financialPlan) {
      return res.status(400).json({ error: 'financialPlan object is required' });
    }
    const result = await generateFinancialInsights({ financialPlan, language });
    return res.json(result);
  } catch (error: any) {
    console.error('Financial insight route error:', error);
    return res.status(500).json({ error: 'Failed to generate financial insight' });
  }
});

// POST /api/ai/business-plan
router.post('/business-plan', async (req: Request, res: Response) => {
  try {
    const { profile, financialPlan, language } = req.body;
    const result = await generateBusinessPlan({
      profile: profile || {},
      financialPlan: financialPlan || {},
      language: language || 'en'
    });
    return res.json(result);
  } catch (error: any) {
    console.error('Business plan route error:', error);
    return res.status(500).json({ error: 'Failed to generate business plan' });
  }
});

// POST /api/ai/business-health
router.post('/business-health', async (req: Request, res: Response) => {
  try {
    const { sales, expenses, customers, stockCondition, pendingCredit, language } = req.body;
    const result = await generateBusinessHealthAdvice({
      sales: Number(sales) || 0,
      expenses: Number(expenses) || 0,
      customers: Number(customers) || 10,
      stockCondition: stockCondition || 'stockSlow',
      pendingCredit: Number(pendingCredit) || 0,
      language: language || 'en'
    });
    return res.json(result);
  } catch (error: any) {
    console.error('Business health route error:', error);
    return res.status(500).json({ error: 'Failed to assess business health' });
  }
});

export default router;
