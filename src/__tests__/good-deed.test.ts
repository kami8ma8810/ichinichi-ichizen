import { GoodDeed } from '../types/good-deed';

describe('GoodDeed', () => {
  it('should create a valid good deed', () => {
    const goodDeed: GoodDeed = {
      id: '1',
      content: '電車で席を譲りました',
      date: new Date('2024-03-20'),
      isPublic: true,
    };

    expect(goodDeed).toHaveProperty('id');
    expect(goodDeed).toHaveProperty('content');
    expect(goodDeed).toHaveProperty('date');
    expect(goodDeed).toHaveProperty('isPublic');
    expect(goodDeed.content).toBe('電車で席を譲りました');
    expect(goodDeed.isPublic).toBe(true);
  });

  it('should create a good deed with optional fields', () => {
    const goodDeed: GoodDeed = {
      id: '2',
      content: 'ゴミを拾いました',
      date: new Date('2024-03-20'),
      isPublic: false,
      reflection: '街がきれいになって嬉しかった',
      location: {
        latitude: 35.6812,
        longitude: 139.7671,
      },
    };

    expect(goodDeed.reflection).toBe('街がきれいになって嬉しかった');
    expect(goodDeed.location).toEqual({
      latitude: 35.6812,
      longitude: 139.7671,
    });
  });
}); 