import { BADGES, getEarnedBadges } from '../lib/badge-utils';
import { GoodDeed } from '../types/good-deed';

describe('getEarnedBadges', () => {
  it('7日連続達成バッジが獲得できる', () => {
    const deeds: GoodDeed[] = Array.from({ length: 7 }, (_, i) => ({
      id: String(i),
      content: `Deed ${i}`,
      date: new Date(2024, 5, i + 1),
      isPublic: true,
    }));
    const badges = getEarnedBadges(deeds);
    expect(badges).toContainEqual(expect.objectContaining({ id: 'streak-7' }));
  });

  it('30日連続達成バッジが獲得できる', () => {
    const deeds: GoodDeed[] = Array.from({ length: 30 }, (_, i) => ({
      id: String(i),
      content: `Deed ${i}`,
      date: new Date(2024, 5, i + 1),
      isPublic: true,
    }));
    const badges = getEarnedBadges(deeds);
    expect(badges).toContainEqual(expect.objectContaining({ id: 'streak-30' }));
  });

  it('100回達成バッジが獲得できる', () => {
    const deeds: GoodDeed[] = Array.from({ length: 100 }, (_, i) => ({
      id: String(i),
      content: `Deed ${i}`,
      date: new Date(2024, 5, 1),
      isPublic: true,
    }));
    const badges = getEarnedBadges(deeds);
    expect(badges).toContainEqual(expect.objectContaining({ id: 'total-100' }));
  });

  it('条件を満たさない場合はバッジが獲得できない', () => {
    const deeds: GoodDeed[] = [
      { id: '1', content: 'Deed 1', date: new Date(2024, 5, 1), isPublic: true },
    ];
    const badges = getEarnedBadges(deeds);
    expect(badges).toHaveLength(0);
  });
}); 