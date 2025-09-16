import { originalData } from "./data.js";

const defaultState = {
  cards: structuredClone(originalData),
  lightModeOn: true,
  filterState: "all",
};

let saved = loadState();
if (!saved) saved = {};
let state = { ...defaultState, ...saved };

function saveState() {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch(e) {
    console.error('could not save state', e);
  }
}

function loadState() {
  try { 
    return JSON.parse(localStorage.getItem("state"));
  } catch(e) {
    console.error('could not load from storage', e);
    return null;
  } 
}

export {state, saveState}  ;