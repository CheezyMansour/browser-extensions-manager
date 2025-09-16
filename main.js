import { state, saveState } from "./state.js";



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

function render() {
  renderMode();
  renderFilterButtons();
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
  let finalHTML = "";

  filterCards().forEach((card) => {
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
}

  //============== EVENT LISTENERS

function addEventListeners() {
  toggleLightButton.addEventListener("click", () => {
    toggleMode();
  });

  extensionsGrid.addEventListener("click", (e) => {
    const slider = e.target.closest(".slider");
    const removeButton = e.target.closest(".remove-button");

    if (slider) {
      const id = slider.dataset.id;
      state.cards = toggleExtensions(id);
      saveState();
      render();
    } 
    else if (removeButton) {
      const id = removeButton.dataset.id;
      state.cards = state.cards.filter((card) => String(card.id) !== id);
      saveState();
      render();
    }
  });

  activityButtonsContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    state.filterState = button.dataset.filterState;
    saveState();
    render();
  });
}

 //================== HELPER FUNCTIONS

function toggleMode() {
  state.lightModeOn = !state.lightModeOn;
  saveState();
  render();
}

function filterCards() {
  const { filterState, cards } = state;
  switch (filterState) {
    case "active":
      return cards.filter((c) => c.isActive);
    case "inactive":
      return cards.filter((c) => !c.isActive);
    default:
      return cards;
  }
}

function toggleExtensions(id) {
  return state.cards.map(card => 
    String(card.id) === id 
      ? {...card, isActive: !card.isActive}
      : card
  );
}
