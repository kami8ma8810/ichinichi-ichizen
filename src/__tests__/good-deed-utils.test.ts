import { filterGoodDeedsByDate, calculateStreak } from '../lib/good-deed-utils';
import { GoodDeed } from '../types/good-deed';

describe('filterGoodDeedsByDate', () => {
  const deeds: GoodDeed[] = [
    { id: '1', content: 'A', date: new Date('2024-06-01'), isPublic: true },
    { id: '2', content: 'B', date: new Date('2024-06-02'), isPublic: true },
    { id: '3', content: 'C', date: new Date('2024-06-01'), isPublic: false },
  ];

  it('指定した日付の善行のみ抽出できる', () => {
    const result = filterGoodDeedsByDate(deeds, new Date('2024-06-01'));
    expect(result).toHaveLength(2);
    expect(result.map((d) => d.id)).toEqual(['1', '3']);
  });

  it('該当する善行がなければ空配列', () => {
    const result = filterGoodDeedsByDate(deeds, new Date('2024-06-03'));
    expect(result).toHaveLength(0);
  });
});

describe('calculateStreak', () => {
  it('連続記録がない場合は1', () => {
    const deeds: GoodDeed[] = [
      { id: '1', content: 'A', date: new Date('2024-06-01'), isPublic: true },
      { id: '2', content: 'B', date: new Date('2024-05-30'), isPublic: true },
    ];
    expect(calculateStreak(deeds)).toBe(1);
  });

  it('2日連続記録なら2', () => {
    const deeds: GoodDeed[] = [
      { id: '1', content: 'A', date: new Date('2024-06-02'), isPublic: true },
      { id: '2', content: 'B', date: new Date('2024-06-01'), isPublic: true },
    ];
    expect(calculateStreak(deeds)).toBe(2);
  });

  it('空配列なら0', () => {
    expect(calculateStreak([])).toBe(0);
  });
}); 