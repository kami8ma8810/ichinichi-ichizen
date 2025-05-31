import { create } from 'zustand';
import { GoodDeed } from '../types/good-deed';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GoodDeedStore = {
  goodDeeds: GoodDeed[];
  addGoodDeed: (goodDeed: GoodDeed) => Promise<void>;
  loadGoodDeeds: () => Promise<void>;
  getGoodDeedById: (id: string) => GoodDeed | undefined;
  getGoodDeedsByDate: (date: Date) => GoodDeed[];
};

export const useGoodDeedStore = create<GoodDeedStore>((set, get) => ({
  goodDeeds: [],

  addGoodDeed: async (goodDeed: GoodDeed) => {
    const currentDeeds = get().goodDeeds;
    const newDeeds = [...currentDeeds, goodDeed];
    set({ goodDeeds: newDeeds });
    await AsyncStorage.setItem('goodDeeds', JSON.stringify(newDeeds));
  },

  loadGoodDeeds: async () => {
    try {
      const storedDeeds = await AsyncStorage.getItem('goodDeeds');
      if (storedDeeds) {
        const parsedDeeds = JSON.parse(storedDeeds).map((deed: any) => ({
          ...deed,
          date: new Date(deed.date),
        }));
        set({ goodDeeds: parsedDeeds });
      }
    } catch (error) {
      console.error('善行の読み込みに失敗しました:', error);
    }
  },

  getGoodDeedById: (id: string) => {
    return get().goodDeeds.find((deed) => deed.id === id);
  },

  getGoodDeedsByDate: (date: Date) => {
    return get().goodDeeds.filter((deed) => {
      const deedDate = new Date(deed.date);
      return (
        deedDate.getFullYear() === date.getFullYear() &&
        deedDate.getMonth() === date.getMonth() &&
        deedDate.getDate() === date.getDate()
      );
    });
  },
})); 