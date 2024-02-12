export interface SocialData {
  message: string;
  results: Result[];
  info:    Info;
}

export interface Info {
  total_likes:     number;
  total_comments:  number;
  total_shares:    number;
  sentiment_stats: SentimentStats;
  emotion_stats:   { [key: string]: number }
  words_stats:     { [key: string]: number };
  hashtags_stats:  { [key: string]: number };
  mentions_stats:  { [key: string]: number };
}

export interface EmotionStats {
  emotion:number
}

export interface SentimentStats {
  NEG: number;
  NEU: number;
  POS: number;
}

export interface Result {
  text:            string;
  sentiment_label: string;
  sentiment_score: number;
  emotion_label:   string;
  emotion_score:   number;
}

