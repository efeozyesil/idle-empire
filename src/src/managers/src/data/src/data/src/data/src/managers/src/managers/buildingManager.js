import { buildings } from '../data/buildings.js';

export class BuildingManager {
  constructor(resourceManager) {
    this.res = resourceManager;
    this.levels = {};
    buildings.forEach(b => this.levels[b.id] = 0);
    this.load();
  }

  canBuild(id) {
    const b = buildings.find(x => x.id === id);
    return this.res.spend(b.cost);
  }

  build(id) {
    if (this.canBuild(id)) {
      this.levels[id]++;
      const b = buildings.find(x => x.id === id);
      this.res.map.get(b.effect.resource).perSecond += b.effect.addPS;
    }
  }

  save() {
    localStorage.setItem('build', JSON.stringify(this.levels));
  }

  load() {
    const data = JSON.parse(localStorage.getItem('build') || 'null');
    if (data) this.levels = data;
  }
}
