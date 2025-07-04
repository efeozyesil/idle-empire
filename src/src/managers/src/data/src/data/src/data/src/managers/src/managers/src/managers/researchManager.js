import { researchTree } from '../data/research.js';

export class ResearchManager {
  constructor(resourceManager, buildingManager) {
    this.res = resourceManager;
    this.buildings = buildingManager;
    this.done = new Set();
    this.load();
  }

  canResearch(id) {
    const node = researchTree.find(r => r.id === id);
    return !this.done.has(id) && this.res.spend(node.cost);
  }

  research(id) {
    if (this.canResearch(id)) {
      this.done.add(id);
      const node = researchTree.find(r => r.id === id);
      node.effect.unlockBuildings?.forEach(bId => {
        // you’d later reveal that building’s UI
      });
    }
  }

  save() {
    localStorage.setItem('resch', JSON.stringify([...this.done]));
  }

  load() {
    const data = JSON.parse(localStorage.getItem('resch') || 'null');
    if (data) this.done = new Set(data);
  }
}
