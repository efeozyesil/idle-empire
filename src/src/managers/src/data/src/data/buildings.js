export const buildings = [
  {
    id: 'lumberHut',
    name: 'Lumberjack Hut',
    tier: 1,
    cost: { wood: 10 },
    effect: { resource: 'wood', addPS: 1 }
  },
  {
    id: 'farm',
    name: 'Farm',
    tier: 1,
    cost: { wood: 15 },
    effect: { resource: 'food', addPS: 1 }
  },
  // ... define Tier2+ buildings similarly
];
