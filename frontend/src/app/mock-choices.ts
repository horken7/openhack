import { Choice } from './choice';

export const CHOICES: Choice[] = [
  { id: 1, type: 'choices', name: 'Bostad', next: 'living' },
  { id: 2, type: 'choices', name: 'Jobb', next: 'work' },
  { id: 3, type: 'choices', name: 'Bostad och Jobb', next: 'living' }
];

export const LIVING: Choice[] = [
  { id: 1, type: 'choices', name: 'Bostadsrätt', next: 'map' },
  { id: 2, type: 'choices', name: 'Hyresrätt', next: 'map' },
  { id: 3, type: 'choices', name: 'Båda', next: 'map' }
];

export const WORK: Choice[] = [
  { id: 1, type: 'choices', name: 'Typ 1 jobb', next: 'map' },
  { id: 2, type: 'choices', name: 'Typ 2 jobb', next: 'map' },
  { id: 3, type: 'choices', name: 'Typ 3 jobb', next: 'map' }
];