export type FlowerType = 'daisy' | 'tulip' | 'sunflower' | 'rose' | 'lotus';

export interface Flower {
  type: FlowerType;
  name: string;
  duration: number; // in minutes
  color: string;
  emoji: string;
}

export interface CompletedSession {
  id: string;
  flowerType: FlowerType;
  completedAt: Date;
}

export const FLOWERS: Flower[] = [
  {
    type: 'daisy',
    name: 'Daisy',
    duration: 25,
    color: '#FFE5EC',
    emoji: '🌼',
  },
  {
    type: 'tulip',
    name: 'Tulip',
    duration: 30,
    color: '#FFD6E8',
    emoji: '🌷',
  },
  {
    type: 'sunflower',
    name: 'Sunflower',
    duration: 45,
    color: '#FFF4CC',
    emoji: '🌻',
  },
  {
    type: 'rose',
    name: 'Rose',
    duration: 50,
    color: '#FFE0E9',
    emoji: '🌹',
  },
  {
    type: 'lotus',
    name: 'Lotus',
    duration: 60,
    color: '#E5F3FF',
    emoji: '🪷',
  },
];
