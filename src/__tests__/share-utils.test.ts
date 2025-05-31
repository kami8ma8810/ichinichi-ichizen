import { generateShareText } from '../lib/share-utils';
import { GoodDeed } from '../types/good-deed';

describe('generateShareText', () => {
  const goodDeed: GoodDeed = {
    id: '1',
    content: '電車で席を譲りました',
    date: new Date('2024-06-01'),
    isPublic: true,
    reflection: '笑顔でお礼を言われて嬉しかった',
  };

  const allDeeds: GoodDeed[] = [
    goodDeed,
    {
      id: '2',
      content: '昨日の善行',
      date: new Date('2024-05-31'),
      isPublic: true,
    },
  ];

  it('Twitter用のテキストを生成できる', () => {
    const result = generateShareText(goodDeed, 'twitter', allDeeds);
    expect(result).toContain('今日の一善：電車で席を譲りました');
    expect(result).toContain('2日連続🔥');
    expect(result).toContain('#一日一善');
    expect(result).toContain('2024/6/1');
  });

  it('Instagram用のテキストを生成できる', () => {
    const result = generateShareText(goodDeed, 'instagram', allDeeds);
    expect(result).toContain('✨ 今日の一善 ✨');
    expect(result).toContain('💝 電車で席を譲りました');
    expect(result).toContain('💭 笑顔でお礼を言われて嬉しかった');
    expect(result).toContain('🔥 2日連続で善行を継続中！');
  });

  it('Facebook用のテキストを生成できる', () => {
    const result = generateShareText(goodDeed, 'facebook', allDeeds);
    expect(result).toContain('2024/6/1の一善');
    expect(result).toContain('電車で席を譲りました');
    expect(result).toContain('2日連続で善行を継続しています');
    expect(result).toContain('振り返り：笑顔でお礼を言われて嬉しかった');
  });

  it('連続記録がない場合はストリーク表示なし', () => {
    const singleDeed = [goodDeed];
    const result = generateShareText(goodDeed, 'twitter', singleDeed);
    expect(result).not.toContain('連続');
  });

  it('振り返りがない場合は振り返り表示なし', () => {
    const deedWithoutReflection: GoodDeed = {
      ...goodDeed,
      reflection: undefined,
    };
    const result = generateShareText(deedWithoutReflection, 'instagram');
    expect(result).not.toContain('💭');
  });

  it('不明なプラットフォームの場合はデフォルトテキスト', () => {
    const result = generateShareText(goodDeed, 'unknown' as any);
    expect(result).toBe('今日の一善：電車で席を譲りました #一日一善 #善行 #小さな親切');
  });
}); 