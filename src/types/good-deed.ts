export type GoodDeed = {
  id: string;
  content: string;
  date: Date;
  reflection?: string;
  isPublic: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  imageUrl?: string;
};

export type GoodDeedTemplate = {
  id: string;
  content: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}; 