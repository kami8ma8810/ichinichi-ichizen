import { GoodDeed } from '../types/good-deed';

/**
 * 指定した日付の善行を抽出する
 */
export const filterGoodDeedsByDate = (
  goodDeeds: ReadonlyArray<GoodDeed>,
  date: Date
): GoodDeed[] =>
  goodDeeds.filter((deed) => {
    const d = new Date(deed.date);
    return (
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    );
  });

/**
 * 善行の連続記録日数（ストリーク）を計算する
 */
export const calculateStreak = (
  goodDeeds: ReadonlyArray<GoodDeed>
): number => {
  if (goodDeeds.length === 0) return 0;
  // 日付の降順でソート
  const sorted = [...goodDeeds].sort((a, b) => +new Date(b.date) - +new Date(a.date));
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