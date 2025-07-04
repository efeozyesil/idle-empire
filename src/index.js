import { ResourceManager } from './managers/resourceManager.js';
import { BuildingManager } from './managers/buildingManager.js';
import { ResearchManager } from './managers/researchManager.js';
import { UIManager } from './ui/uiManager.js';

const resMgr = new ResourceManager();
const buildMgr = new BuildingManager(resMgr);
const reschMgr = new ResearchManager(resMgr, buildMgr);
const uiMgr = new UIManager(resMgr, buildMgr, reschMgr);

let last = performance.now();
function gameLoop(ts) {
  const dt = (ts - last) / 1000;
  resMgr.addPerSecond(dt);
  uiMgr.render();
  last = ts;
  requestAnimationFrame(gameLoop);
}

document.getElementById('clickButton').onclick = ()=> resMgr.addResource('wood',1);
requestAnimationFrame(gameLoop);
setInterval(()=>{ resMgr.save(); buildMgr.save(); reschMgr.save(); }, 30000);
