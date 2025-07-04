export class UIManager {
  constructor(resMgr, buildMgr, reschMgr) {
    this.res = resMgr;
    this.build = buildMgr;
    this.resch = reschMgr;
    this.resourcesDiv = document.getElementById('resources');
    this.buildingsDiv = document.getElementById('buildings');
    this.researchDiv  = document.getElementById('research');
  }

  render() {
    // --- Resources display ---
    this.resourcesDiv.innerHTML = '';
    this.res.map.forEach(r => {
      const el = document.createElement('div');
      el.textContent = `${r.name}: ${Math.floor(r.amount)}`;
      this.resourcesDiv.appendChild(el);
    });

    // --- Buildings list ---
    this.buildingsDiv.innerHTML = '';
    import('../data/buildings.js').then(m => {
      m.buildings.forEach(b => {
        const lvl = this.build.levels[b.id];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <strong>${b.name} (x${lvl})</strong><br/>
          Cost: ${JSON.stringify(b.cost)}<br/>
          <button id="buy-${b.id}">Buy</button>
        `;
        this.buildingsDiv.appendChild(card);
        document.getElementById(`buy-${b.id}`)
          .onclick = () => {
            this.build.build(b.id);
            this.build.save();
          };
      });
    });
  }
}
