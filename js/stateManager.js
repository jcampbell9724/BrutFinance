// stateManager.js
const STORAGE_KEY = "app_state";
function readAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function writeAll(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** Get full state for a given appId (e.g. "debtOverview") */
export function getState(appId) {
  const all = readAll();
  return all[appId] || {};
}

/** Merge in new values for that app */
export function setState(appId, partial) {
  const all = readAll();
  all[appId] = { ...(all[appId]||{}), ...partial };
  writeAll(all);
}

/** Clear state for one app or everything */
export function clearState(appId) {
  if (!appId) return localStorage.removeItem(STORAGE_KEY);
  const all = readAll();
  delete all[appId];
  writeAll(all);
}