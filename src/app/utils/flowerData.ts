export type FlowerType = 'daisy' | 'rose' | 'tulip' | 'sunflower' | 'lotus';

export interface Flower {
  id: FlowerType;
  name: string;
  color: string;
  description: string;
  rowIndex: number;
}

export const flowers: Flower[] = [
  {
    id: 'daisy',
    name: 'Daisy',
    color: '#FFE4B5',
    description: 'Cheerful and bright',
    rowIndex: 0,
  },
  {
    id: 'rose',
    name: 'Rose',
    color: '#FFB6C1',
    description: 'Classic and elegant',
    rowIndex: 1,
  },
  {
    id: 'tulip',
    name: 'Tulip',
    color: '#FFD89B',
    description: 'Simple and graceful',
    rowIndex: 2,
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    color: '#FFE58F',
    description: 'Warm and radiant',
    rowIndex: 3,
  },
  {
    id: 'lotus',
    name: 'Lotus',
    color: '#FFE5EC',
    description: 'Peaceful and serene',
    rowIndex: 4,
  },
];

export interface CompletedFlower {
  flowerId: FlowerType;
  completedAt: number;
}

export const getFlowerById = (id: FlowerType): Flower | undefined => {
  return flowers.find(f => f.id === id);
};

export const saveCompletedFlower = (flowerId: FlowerType) => {
  const garden = getGarden();
  garden.push({
    flowerId,
    completedAt: Date.now(),
  });
  localStorage.setItem('flower-garden', JSON.stringify(garden));
};

export const getGarden = (): CompletedFlower[] => {
  const stored = localStorage.getItem('flower-garden');
  return stored ? JSON.parse(stored) : [];
};
