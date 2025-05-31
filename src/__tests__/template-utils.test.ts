import {
  filterTemplatesByCategory,
  filterTemplatesByDifficulty,
  suggestTemplates,
  TEMPLATES,
} from '../lib/template-utils';

describe('filterTemplatesByCategory', () => {
  it('指定したカテゴリのテンプレートのみ抽出できる', () => {
    const result = filterTemplatesByCategory(TEMPLATES, '環境美化');
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.category === '環境美化')).toBe(true);
  });

  it('該当するテンプレートがなければ空配列', () => {
    const result = filterTemplatesByCategory(TEMPLATES, '存在しないカテゴリ');
    expect(result).toHaveLength(0);
  });
});

describe('filterTemplatesByDifficulty', () => {
  it('指定した難易度のテンプレートのみ抽出できる', () => {
    const result = filterTemplatesByDifficulty(TEMPLATES, 'easy');
    expect(result).toHaveLength(4);
    expect(result.every((t) => t.difficulty === 'easy')).toBe(true);
  });

  it('medium難易度のテンプレートを抽出できる', () => {
    const result = filterTemplatesByDifficulty(TEMPLATES, 'medium');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('donate');
  });
});

describe('suggestTemplates', () => {
  it('雨の日にはrainy用のテンプレートを提案する', () => {
    const result = suggestTemplates('rainy', 'afternoon', 'happy');
    expect(result.some((t) => t.id === 'help-rainy')).toBe(true);
  });

  it('朝の時間帯にはeasy難易度を提案する', () => {
    const result = suggestTemplates('sunny', 'morning', 'happy');
    expect(result.every((t) => t.difficulty === 'easy')).toBe(true);
  });

  it('疲れているときはeasy難易度を提案する', () => {
    const result = suggestTemplates('sunny', 'afternoon', 'tired');
    expect(result.every((t) => t.difficulty === 'easy')).toBe(true);
  });

  it('元気なときはeasy以外の難易度を提案する', () => {
    const result = suggestTemplates('sunny', 'afternoon', 'energetic');
    expect(result.every((t) => t.difficulty !== 'easy')).toBe(true);
  });

  it('提案は最大3つまで', () => {
    const result = suggestTemplates('sunny', 'afternoon', 'happy');
    expect(result.length).toBeLessThanOrEqual(3);
  });
}); 