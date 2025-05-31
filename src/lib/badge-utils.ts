import { GoodDeed } from '../types/good-deed';

export type Badge = {
  id: string;
  name: string;
  description: string;
  condition: (deeds: ReadonlyArray<GoodDeed>) => boolean;
};

export const BADGES: ReadonlyArray<Badge> = [
  {
    id: 'streak-7',
    name: '7日連続達成',
    description: '7日連続で善行を記録しました',
    condition: (deeds) => calculateStreak(deeds) >= 7,
  },
  {
    id: 'streak-30',
    name: '30日連続達成',
    description: '30日連続で善行を記録しました',
    condition: (deeds) => calculateStreak(deeds) >= 30,
  },
  {
    id: 'total-100',
    name: '100回達成',
    description: '合計100回の善行を記録しました',
    condition: (deeds) => deeds.length >= 100,
  },
];

export const calculateStreak = (deeds: ReadonlyArray<GoodDeed>): number => {
  if (deeds.length === 0) return 0;
  const sorted = [...deeds].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].date);
    const curr = new Date(sorted[i].date);
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak++;
    else if (diff > 1) break;
  }
  return streak;
};

export const getEarnedBadges = (deeds: ReadonlyArray<GoodDeed>): Badge[] =>
  BADGES.filter((badge) => badge.condition(deeds)); 