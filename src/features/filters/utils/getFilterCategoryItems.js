function getFilterCategoryItems(inputAllItemsData, itemsCategory, filterCategory, searchTerm) {
  // get all the items from a certain category (men-watches, women watches, watches-accessories) or for the searched items
  const oneCategoryItems =
    itemsCategory === "search"
      ? inputAllItemsData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : inputAllItemsData.filter((item) => item.category === itemsCategory);

  // get all the items for a certain property (brand, material, price, color)
  const filterCategoryAllItems = oneCategoryItems.map((item) => item[filterCategory]);

  // removes duplicate elements from the 'filterCategoryAllItems' array
  const filterCategoryUniqueItems = [...new Set(filterCategoryAllItems)];

  const appearancesObject = filterCategoryUniqueItems.reduce((object, uniqueValue) => {
    object[uniqueValue] = filterCategoryAllItems.filter((value) => value === uniqueValue).length;
    return object;
  }, {});

  let appearancesArray = [];
  for (const key in appearancesObject) {
    appearancesArray.push({
      [filterCategory]: key,
      numOfAppearances: appearancesObject[key],
    });
  }

  return {
    oneCategoryItems: oneCategoryItems,
    numOfAppearancesItems: appearancesArray,
  };
}

export default getFilterCategoryItems;
