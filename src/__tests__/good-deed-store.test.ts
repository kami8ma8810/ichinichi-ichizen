import { useGoodDeedStore } from '../store/good-deed-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('GoodDeedStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useGoodDeedStore.setState({ goodDeeds: [] });
  });

  it('should add a good deed', async () => {
    const goodDeed = {
      id: '1',
      content: '電車で席を譲りました',
      date: new Date('2024-03-20'),
      isPublic: true,
    };

    await useGoodDeedStore.getState().addGoodDeed(goodDeed);

    expect(useGoodDeedStore.getState().goodDeeds).toHaveLength(1);
    expect(useGoodDeedStore.getState().goodDeeds[0]).toEqual(goodDeed);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'goodDeeds',
      JSON.stringify([goodDeed])
    );
  });

  it('should load good deeds from storage', async () => {
    const storedDeeds = [
      {
        id: '1',
        content: '電車で席を譲りました',
        date: '2024-03-20T00:00:00.000Z',
        isPublic: true,
      },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedDeeds));

    await useGoodDeedStore.getState().loadGoodDeeds();

    expect(useGoodDeedStore.getState().goodDeeds).toHaveLength(1);
    expect(useGoodDeedStore.getState().goodDeeds[0].date).toBeInstanceOf(Date);
  });

  it('should get good deeds by date', () => {
    const goodDeed = {
      id: '1',
      content: '電車で席を譲りました',
      date: new Date('2024-03-20'),
      isPublic: true,
    };

    useGoodDeedStore.setState({ goodDeeds: [goodDeed] });

    const deeds = useGoodDeedStore.getState().getGoodDeedsByDate(new Date('2024-03-20'));
    expect(deeds).toHaveLength(1);
    expect(deeds[0]).toEqual(goodDeed);
  });
}); 