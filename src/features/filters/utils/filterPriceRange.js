function filterPriceRangeItems(allFilterItems) {
  const itemsSmallerThan500 = allFilterItems.filter((item) => item.price <= 500).length;
  const items500_1000 = allFilterItems.filter((item) => 500 < item.price && item.price <= 1000).length;
  const items1000_2000 = allFilterItems.filter((item) => 1000 < item.price && item.price <= 2000).length;
  const items2000_5000 = allFilterItems.filter((item) => 2000 < item.price && item.price <= 5000).length;
  const itemsGreaterThan5000 = allFilterItems.filter((item) => item.price > 5000).length;

  return [    
    {price: "€0 - €500", numOfAppearances: itemsSmallerThan500, minValue: 0, maxValue: 500},
    {price: "€500 - €1000", numOfAppearances: items500_1000, minValue: 500, maxValue: 1000},
    {price: "€1000 - €2000",numOfAppearances:  items1000_2000, minValue: 1000, maxValue: 2000},
    {price: "€2000 - €5000", numOfAppearances: items2000_5000, minValue: 2000, maxValue: 5000},
    {price: "> €5000" , numOfAppearances:itemsGreaterThan5000, minValue: 5000, maxValue: 10000000},
  ];
}

export default filterPriceRangeItems;
