import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'emerald' | 'amber' | 'rose' | 'stone' | 'teal';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'stone',
  onClick
}) => {
  const variantStyles = {
    emerald: {
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
      valColor: 'text-emerald-900'
    },
    amber: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700',
      valColor: 'text-amber-900'
    },
    rose: {
      bg: 'bg-rose-50/70',
      border: 'border-rose-200',
      iconBg: 'bg-rose-100 text-rose-700',
      valColor: 'text-rose-900'
    },
    teal: {
      bg: 'bg-teal-50/70',
      border: 'border-teal-200',
      iconBg: 'bg-teal-100 text-teal-700',
      valColor: 'text-teal-900'
    },
    stone: {
      bg: 'bg-white',
      border: 'border-stone-200',
      iconBg: 'bg-stone-100 text-stone-700',
      valColor: 'text-stone-900'
    }
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border ${variantStyles.border} ${variantStyles.bg} transition-all shadow-2xs ${
        onClick ? 'cursor-pointer hover:shadow-sm active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl ${variantStyles.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className={`mt-2 text-2xl font-extrabold tabular-nums tracking-tight ${variantStyles.valColor}`}>
        {value}
      </div>
      {subtitle && <p className="mt-1 text-xs text-stone-500 font-normal">{subtitle}</p>}
    </div>
  );
};
