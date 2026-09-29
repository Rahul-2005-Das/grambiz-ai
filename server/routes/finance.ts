import { Router, Request, Response } from 'express';

const router = Router();

// Store in-memory sales and expenses for the session/demo
let salesRecords: any[] = [
  { id: 's1', date: new Date().toISOString().split('T')[0], product: 'Fresh Cow Milk (10L)', quantity: 10, amount: 550, isPaid: true },
  { id: 's2', date: new Date().toISOString().split('T')[0], product: 'Chhana / Cottage Cheese', quantity: 2, amount: 480, isPaid: true },
  { id: 's3', date: new Date().toISOString().split('T')[0], product: 'Ghee pack (500g)', quantity: 1, amount: 350, customerName: 'Ramesh Mondal', isPaid: false }
];

let expenseRecords: any[] = [
  { id: 'e1', date: new Date().toISOString().split('T')[0], category: 'raw_materials', amount: 320, notes: 'Cattle feed bran' },
  { id: 'e2', date: new Date().toISOString().split('T')[0], category: 'transport', amount: 60, notes: 'Morning auto fare' }
];

// GET /api/finance/records
router.get('/records', (req: Request, res: Response) => {
  const totalSales = salesRecords.reduce((acc, s) => acc + (s.amount || 0), 0);
  const totalExpenses = expenseRecords.reduce((acc, e) => acc + (e.amount || 0), 0);
  const pendingCredit = salesRecords.filter(s => !s.isPaid).reduce((acc, s) => acc + (s.amount || 0), 0);

  res.json({
    success: true,
    sales: salesRecords,
    expenses: expenseRecords,
    summary: {
      totalSales,
      totalExpenses,
      netBalance: totalSales - totalExpenses,
      pendingCredit
    }
  });
});

// POST /api/finance/sales
router.post('/sales', (req: Request, res: Response) => {
  const { product, quantity, amount, customerName, isPaid = true } = req.body;
  if (!product || !amount) {
    return res.status(400).json({ error: 'Product and amount are required' });
  }

  const newSale = {
    id: `sale_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    product,
    quantity: Number(quantity) || 1,
    amount: Number(amount),
    customerName: customerName || '',
    isPaid: Boolean(isPaid)
  };

  salesRecords.unshift(newSale);
  res.json({ success: true, record: newSale });
});

// POST /api/finance/expenses
router.post('/expenses', (req: Request, res: Response) => {
  const { category, amount, notes } = req.body;
  if (!category || !amount) {
    return res.status(400).json({ error: 'Category and amount are required' });
  }

  const newExpense = {
    id: `exp_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    category,
    amount: Number(amount),
    notes: notes || ''
  };

  expenseRecords.unshift(newExpense);
  res.json({ success: true, record: newExpense });
});

export default router;
