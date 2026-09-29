import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Plus,
  Volume2,
  Sparkles,
  Trash2
} from 'lucide-react';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export const DailyHelper: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: t.daily.t1, done: true },
    { id: '2', text: t.daily.t2, done: false },
    { id: '3', text: t.daily.t3, done: false },
    { id: '4', text: t.daily.t4, done: false },
    { id: '5', text: t.daily.t5, done: false },
  ]);

  const [newTaskInput, setNewTaskInput] = useState('');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: `task_${Date.now()}`, text: newTaskInput.trim(), done: false }
    ]);
    setNewTaskInput('');
  };

  const completedCount = tasks.filter((t) => t.done).length;

  const handleReadTasks = () => {
    const speech = `Daily tasks for today. Completed ${completedCount} of ${tasks.length}. First task: ${tasks[0]?.text || ''}. Second task: ${tasks[1]?.text || ''}.`;
    speak(speech);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-3">
            <CalendarCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>{language === 'bn' ? 'দৈনিক কাজের তালিকা' : 'Daily Business Habits'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.daily.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.daily.subtitle}
          </p>
        </div>

        <button
          onClick={handleReadTasks}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 border border-stone-300 transition-all shrink-0 active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.daily.listenTasks}</span>
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-emerald-800 text-white rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            {completedCount} / {tasks.length} {t.daily.completedCount}
          </span>
          <h3 className="text-lg font-black mt-1">
            {completedCount === tasks.length
              ? (language === 'bn' ? '🎉 দারুণ! আজকের সমস্ত কাজ সম্পন্ন হয়েছে' : '🎉 All tasks done for today!')
              : (language === 'bn' ? 'আজকের কাজগুলো এক এক করে শেষ করুন' : 'Keep your momentum going step by step')}
          </h3>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center font-black text-xl border border-white/20 shrink-0">
          {Math.round((completedCount / tasks.length) * 100)}%
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] ${
              task.done
                ? 'bg-emerald-50/50 border-emerald-200 text-stone-500'
                : 'bg-stone-50 border-stone-200 hover:border-emerald-300 text-stone-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                {task.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-300 hover:text-emerald-500" />
                )}
              </div>
              <span className={`text-xs sm:text-sm font-medium ${task.done ? 'line-through' : ''}`}>
                {task.text}
              </span>
            </div>
          </div>
        ))}

        {/* Add custom task */}
        <form onSubmit={handleAddTask} className="pt-3 flex gap-2">
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder={t.daily.addTask}
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={!newTaskInput.trim()}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </form>
      </div>
    </div>
  );
};
