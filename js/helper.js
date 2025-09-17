export function toggleMode(state) {
  return { ...state, lightModeOn: !state.lightModeOn };
}

export function filterCards(state) {
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

export function toggleExtensions(state, id) {
  const newCards = state.cards.map((card) =>
    String(card.id) === id ? { ...card, isActive: !card.isActive } : card
  );
  return { ...state, cards: newCards };
}

export function removeCards(state, id) {
  const newCards = state.cards.filter((card) => String(card.id) !== id);
  return { ...state, cards: newCards };
}

export function setFilterState(state, button) {
  const newState = button.dataset.filterState;
  return { ...state, filterState: newState };
}
