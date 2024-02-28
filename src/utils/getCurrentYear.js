function getCurrentYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
}

export default getCurrentYear;