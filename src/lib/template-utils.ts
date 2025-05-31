import { GoodDeedTemplate } from '../types/good-deed';

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'snowy';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type Mood = 'happy' | 'sad' | 'tired' | 'energetic';

export const TEMPLATES: ReadonlyArray<GoodDeedTemplate> = [
  {
    id: 'help-elderly',
    content: '電車で席を譲る',
    category: '交通マナー',
    difficulty: 'easy',
  },
  {
    id: 'pick-trash',
    content: '道端のゴミを拾う',
    category: '環境美化',
    difficulty: 'easy',
  },
  {
    id: 'compliment',
    content: '誰かを褒める',
    category: 'コミュニケーション',
    difficulty: 'easy',
  },
  {
    id: 'donate',
    content: '募金をする',
    category: '社会貢献',
    difficulty: 'medium',
  },
  {
    id: 'volunteer',
    content: 'ボランティア活動に参加する',
    category: '社会貢献',
    difficulty: 'hard',
  },
  {
    id: 'help-rainy',
    content: '濡れた床を拭く',
    category: '環境美化',
    difficulty: 'easy',
  },
];

export const filterTemplatesByCategory = (
  templates: ReadonlyArray<GoodDeedTemplate>,
  category: string
): GoodDeedTemplate[] =>
  templates.filter((template) => template.category === category);

export const filterTemplatesByDifficulty = (
  templates: ReadonlyArray<GoodDeedTemplate>,
  difficulty: 'easy' | 'medium' | 'hard'
): GoodDeedTemplate[] =>
  templates.filter((template) => template.difficulty === difficulty);

export const suggestTemplates = (
  weather: Weather,
  timeOfDay: TimeOfDay,
  mood: Mood
): GoodDeedTemplate[] => {
  let suggestions = [...TEMPLATES];

  // 天気に応じた提案
  if (weather === 'rainy') {
    suggestions = suggestions.filter(
      (t) => t.id === 'help-rainy' || t.category === 'コミュニケーション'
    );
  }

  // 時間帯に応じた提案
  if (timeOfDay === 'morning') {
    suggestions = suggestions.filter((t) => t.difficulty === 'easy');
  }

  // 気分に応じた提案
  if (mood === 'tired') {
    suggestions = suggestions.filter((t) => t.difficulty === 'easy');
  } else if (mood === 'energetic') {
    suggestions = suggestions.filter((t) => t.difficulty !== 'easy');
  }

  return suggestions.slice(0, 3); // 最大3つの提案
}; 