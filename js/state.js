import { originalData } from "./data.js";
import { render } from "./main.js";

const defaultState = {
  cards: structuredClone(originalData),
  lightModeOn: true,
  filterState: "all",
};

let saved = loadFromStorage("state");
if (!saved) saved = {};
let state = { ...defaultState, ...saved };

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("could not save state", e);
  }
}

function loadFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.error("could not load from storage", e);
    return null;
  }
}

function setState(newState) {
  state = newState;
  saveToStorage("state", state);
  setTimeout(render, 200)
  // render();
}

export { state, saveToStorage, setState };
