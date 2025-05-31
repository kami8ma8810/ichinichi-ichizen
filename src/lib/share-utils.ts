import { GoodDeed } from '../types/good-deed';
import { calculateStreak } from './good-deed-utils';

export type SharePlatform = 'twitter' | 'instagram' | 'facebook';

export const generateShareText = (
  goodDeed: GoodDeed,
  platform: SharePlatform,
  allDeeds: ReadonlyArray<GoodDeed> = []
): string => {
  const streak = calculateStreak(allDeeds);
  const hashtags = '#一日一善 #善行 #小さな親切';

  switch (platform) {
    case 'twitter':
      return generateTwitterText(goodDeed, streak, hashtags);
    case 'instagram':
      return generateInstagramText(goodDeed, streak, hashtags);
    case 'facebook':
      return generateFacebookText(goodDeed, streak, hashtags);
    default:
      return `今日の一善：${goodDeed.content} ${hashtags}`;
  }
};

const generateTwitterText = (
  goodDeed: GoodDeed,
  streak: number,
  hashtags: string
): string => {
  const date = goodDeed.date.toLocaleDateString('ja-JP');
  const streakText = streak > 1 ? `（${streak}日連続🔥）` : '';
  return `【${date}】今日の一善：${goodDeed.content} ${streakText}\n\n小さな善行を積み重ねています ✨\n\n${hashtags}`;
};

const generateInstagramText = (
  goodDeed: GoodDeed,
  streak: number,
  hashtags: string
): string => {
  const date = goodDeed.date.toLocaleDateString('ja-JP');
  const streakText = streak > 1 ? `\n\n🔥 ${streak}日連続で善行を継続中！` : '';
  const reflection = goodDeed.reflection ? `\n\n💭 ${goodDeed.reflection}` : '';
  
  return `✨ 今日の一善 ✨\n📅 ${date}\n\n💝 ${goodDeed.content}${reflection}${streakText}\n\n${hashtags}`;
};

const generateFacebookText = (
  goodDeed: GoodDeed,
  streak: number,
  hashtags: string
): string => {
  const date = goodDeed.date.toLocaleDateString('ja-JP');
  const streakText = streak > 1 ? ` ${streak}日連続で善行を継続しています。` : '';
  const reflection = goodDeed.reflection ? `\n\n振り返り：${goodDeed.reflection}` : '';
  
  return `${date}の一善\n\n${goodDeed.content}\n\n小さな善行を日々積み重ねています。${streakText}${reflection}\n\n${hashtags}`;
}; 