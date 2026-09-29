import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { formatINR } from '../services/financialService';
import {
  Receipt,
  Plus,
  Minus,
  TrendingUp,
  Wallet,
  Coins,
  CheckCircle2,
  Calendar,
  Volume2
} from 'lucide-react';

export const SalesExpenses: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [activeForm, setActiveForm] = useState<'sale' | 'expense' | null>(null);

  // Form inputs
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isCredit, setIsCredit] = useState(false);

  const [expenseCategory, setExpenseCategory] = useState<string>('raw_materials');
  const [expenseNotes, setExpenseNotes] = useState('');

  // Transaction history
  const [records, setRecords] = useState<any[]>([
    { id: '1', type: 'sale', title: '5L Fresh Cow Milk', amount: 280, isCredit: false, date: 'Today' },
    { id: '2', type: 'sale', title: '1kg Chhana', amount: 240, isCredit: false, date: 'Today' },
    { id: '3', type: 'expense', title: 'Cattle Bran Feed', amount: 320, category: 'raw_materials', date: 'Today' },
    { id: '4', type: 'sale', title: '2L Cow Milk', amount: 110, isCredit: true, customer: 'Mondal Da', date: 'Today' }
  ]);

  const [summary, setSummary] = useState({
    todaySales: 630,
    todayExpenses: 320,
    netBalance: 310
  });

  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!productName || !amt) return;

    await api.addSale({
      product: productName,
      quantity,
      amount: amt,
      customerName,
      isPaid: !isCredit
    });

    const newRecord = {
      id: `sale_${Date.now()}`,
      type: 'sale',
      title: `${productName} (${quantity})`,
      amount: amt,
      isCredit,
      customer: customerName,
      date: 'Today'
    };

    setRecords((prev) => [newRecord, ...prev]);
    setSummary((prev) => ({
      ...prev,
      todaySales: prev.todaySales + amt,
      netBalance: prev.netBalance + amt
    }));

    // Reset
    setProductName('');
    setQuantity(1);
    setAmount('');
    setCustomerName('');
    setIsCredit(false);
    setActiveForm(null);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt) return;

    await api.addExpense({
      category: expenseCategory as any,
      amount: amt,
      notes: expenseNotes
    });

    const newRecord = {
      id: `exp_${Date.now()}`,
      type: 'expense',
      title: expenseNotes || expenseCategory,
      amount: amt,
      category: expenseCategory,
      date: 'Today'
    };

    setRecords((prev) => [newRecord, ...prev]);
    setSummary((prev) => ({
      ...prev,
      todayExpenses: prev.todayExpenses + amt,
      netBalance: prev.netBalance - amt
    }));

    setAmount('');
    setExpenseNotes('');
    setActiveForm(null);
  };

  const handleReadSummary = () => {
    const speech = `Cash tracker summary. Today sales: ${formatINR(summary.todaySales)}. Today expenses: ${formatINR(summary.todayExpenses)}. Net balance in cash box: ${formatINR(summary.netBalance)}.`;
    speak(speech);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Receipt className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'bn' ? 'সহজ খাতা' : 'Daily Cash Tracker'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.tracker.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.tracker.subtitle}
          </p>
        </div>

        <button
          onClick={handleReadSummary}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 border border-stone-300 transition-all shrink-0 active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.advisor.listenToAnswer}</span>
        </button>
      </div>

      {/* Visual Cash Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-2xs">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            {t.tracker.todayIn}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1 block tabular-nums">
            {formatINR(summary.todaySales)}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 shadow-2xs">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
            {t.tracker.todayOut}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-stone-800 mt-1 block tabular-nums">
            {formatINR(summary.todayExpenses)}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-teal-50 border border-teal-200 shadow-2xs">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
            {t.tracker.netBalance}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-teal-950 mt-1 block tabular-nums">
            {formatINR(summary.netBalance)}
          </span>
        </div>
      </div>

      {/* Two Big Action Buttons: ➕ Add Sale & ➖ Add Expense */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setActiveForm('sale');
            setAmount('');
          }}
          className={`py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
            activeForm === 'sale'
              ? 'bg-emerald-700 text-white ring-4 ring-emerald-300'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span>{t.tracker.addSale}</span>
        </button>

        <button
          onClick={() => {
            setActiveForm('expense');
            setAmount('');
          }}
          className={`py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
            activeForm === 'expense'
              ? 'bg-rose-700 text-white ring-4 ring-rose-300'
              : 'bg-stone-800 text-white hover:bg-stone-900'
          }`}
        >
          <Minus className="w-5 h-5" />
          <span>{t.tracker.addExpense}</span>
        </button>
      </div>

      {/* Active Form Card */}
      {activeForm === 'sale' && (
        <form onSubmit={handleAddSale} className="bg-emerald-50/60 rounded-3xl p-6 border-2 border-emerald-300 shadow-sm space-y-4 animate-in fade-in">
          <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
            <span>➕</span>
            <span>{t.tracker.addSale}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.tracker.productName}
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Milk 5L, Spices pack"
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.tracker.amount}
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 250"
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-base font-black text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.tracker.customer}
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Optional customer name"
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isCredit}
                onChange={(e) => setIsCredit(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
              />
              <span>{t.tracker.isCredit}</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveForm(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
              >
                {t.tracker.saveRecord}
              </button>
            </div>
          </div>
        </form>
      )}

      {activeForm === 'expense' && (
        <form onSubmit={handleAddExpense} className="bg-rose-50/60 rounded-3xl p-6 border-2 border-rose-300 shadow-sm space-y-4 animate-in fade-in">
          <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
            <span>➖</span>
            <span>{t.tracker.addExpense}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.tracker.expenseCategory}
              </label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm font-semibold"
              >
                <option value="raw_materials">Raw Materials / Stock</option>
                <option value="rent">Shop Rent</option>
                <option value="transport">Transport / Auto fare</option>
                <option value="utilities">Electricity / Bill</option>
                <option value="salary">Helper Wages</option>
                <option value="other">Tea / Miscellaneous</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.tracker.amount}
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 150"
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-base font-black text-rose-800 focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.tracker.notes}
              </label>
              <input
                type="text"
                value={expenseNotes}
                onChange={(e) => setExpenseNotes(e.target.value)}
                placeholder="e.g. Packing bags, Tea"
                className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveForm(null)}
              className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs"
            >
              {t.tracker.saveRecord}
            </button>
          </div>
        </form>
      )}

      {/* Recent Entries List */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
          {t.tracker.recentEntries}
        </h3>

        {records.length === 0 ? (
          <p className="text-xs text-stone-400 py-4 text-center">
            {t.tracker.noEntries}
          </p>
        ) : (
          <div className="space-y-2">
            {records.map((rec) => {
              const isSale = rec.type === 'sale';
              return (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                      isSale ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {isSale ? '↗' : '↘'}
                    </span>
                    <div>
                      <div className="font-bold text-stone-900">{rec.title}</div>
                      <div className="text-[11px] text-stone-500">
                        {rec.isCredit ? `⚠️ Credit (Udhar) ${rec.customer ? `· ${rec.customer}` : ''}` : 'Cash Received'}
                      </div>
                    </div>
                  </div>

                  <div className={`font-black text-sm tabular-nums ${isSale ? 'text-emerald-700' : 'text-stone-700'}`}>
                    {isSale ? '+' : '-'}{formatINR(rec.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
