import { state, setState } from "./state.js";
import {
  toggleMode,
  toggleExtensions,
  filterCards,
  removeCards,
  setFilterState,
} from "./helper.js";

// DOM ELEMENTS
const html = document.documentElement;
const extensionsGrid = document.querySelector(".extensions-grid");
const toggleLightButton = document.querySelector(".toggle-lightmode-button");
const activityButtonsContainer = document.querySelector(
  ".activity-button-list"
);
const activityButtons = document.querySelectorAll(
  ".activity-button-list button"
);

// INITIALIZE
render();
addEventListeners();

//================= RENDER FUNCTIONS

export function render() {
  renderMode();
  renderFilterButtons();
  // setTimeout(renderGrid, 1000)
  renderGrid();
}

function renderMode() {
  state.lightModeOn
    ? html.removeAttribute("data-theme")
    : (html.dataset.theme = "dark");
}

function renderFilterButtons() {
  activityButtons.forEach((button) => {
    if (button.dataset.filterState === state.filterState) {
      button.classList.add("button-active-state");
    } else {
      button.classList.remove("button-active-state");
    }
  });
}

function renderGrid() {
  const filteredCards = filterCards(state);

  if (filteredCards.length === 0) {
    extensionsGrid.innerHTML =
      '<p class="empty-message">No extensions available.</p>';
    return;
  }

  let finalHTML = "";
  filteredCards.forEach((card) => {
    finalHTML += `
      <article class="extensions-card">
          <div class="description">
            <img src="${card.logo}" />
            <div class="text-description">
              <h3>${card.name}</h3>
              <p>
                ${card.description}
              </p>
            </div>
          </div>
          <div class="buttons">
            <button data-id="${
              card.id
            }" class="remove-button" type="button">Remove</button>
             <label class="switch">
              <input ${card.isActive ? "checked" : ""} type="checkbox" />
              <span data-id="${card.id}" class="slider"></span>
            </label>
          </div>
        </article>
      `;
  });
  extensionsGrid.innerHTML = finalHTML;

  if (filteredCards.length === 0) {
    console.log("filtered cards = 0");
    return;
  }
}

//============== EVENT LISTENERS
function addEventListeners() {
  toggleLightButton.addEventListener("click", () => {
    handleModeToggleEvent();
  });

  extensionsGrid.addEventListener("click", (e) => {
    const slider = e.target.closest(".slider");
    const removeButton = e.target.closest(".remove-button");

    if (slider) handleSliderEvent(slider);
    else if (removeButton) handleRemoveButtonEvent(removeButton);
  });

  activityButtonsContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    handleFilterButtonEvent(button);
  });
}

// EVENT HANDLERS

function handleFilterButtonEvent(button) {
  if (!button) return;
  setState(setFilterState(state, button));
}

function handleRemoveButtonEvent(removeButton) {
  const id = removeButton.dataset.id;
  setState(removeCards(state, id));
}

function handleModeToggleEvent() {
  setState(toggleMode(state));
}

function handleSliderEvent(slider) {
  const id = slider.dataset.id;
  setState(toggleExtensions(state, id));
}
