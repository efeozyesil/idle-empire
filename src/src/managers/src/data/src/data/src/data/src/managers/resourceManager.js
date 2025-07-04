import { resources } from '../data/resources.js';

export class ResourceManager {
  constructor() {
    this.map = new Map(resources.map(r => [r.id, { ...r }]));
    this.load();
  }

  addPerSecond(dt) {
    this.map.forEach(r => r.amount += r.perSecond * dt);
  }

  addResource(id, amt) {
    this.map.get(id).amount += amt;
  }

  spend(cost) {
    if (Object.entries(cost).every(([res, qty]) =>
      this.map.get(res).amount >= qty
    )) {
      Object.entries(cost).forEach(([res, qty]) =>
        this.map.get(res).amount -= qty
      );
      return true;
    }
    return false;
  }

  save() {
    localStorage.setItem('res', JSON.stringify([...this.map]));
  }

  load() {
    const data = JSON.parse(localStorage.getItem('res') || 'null');
    if (data) data.forEach(([id, obj]) => this.map.set(id, obj));
  }
}
