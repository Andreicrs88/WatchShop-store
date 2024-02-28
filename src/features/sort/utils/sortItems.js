export function sortAZ(items) {
  const sortedItemsAZ = items.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedItemsAZ;
}

export function sortZA(items) {
  const sortedItemsZA = items.sort((a, b) => {
    if (a.title > b.title) {
      return -1;
    } else if (a.title < b.title) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedItemsZA;
}

export function sortPriceUp(items) {
  const sortedItemsPriceLowToHigh = items.sort((a, b) => {
    if (a.price > b.price) {
      return 1;
    } else if (a.price < b.price) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedItemsPriceLowToHigh;
}

export function sortPriceDown(items) {
  const sortedItemsPriceHighToLow = items.sort((a, b) => {
    if (a.price > b.price) {
      return -1;
    } else if (a.price < b.price) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedItemsPriceHighToLow;
}
