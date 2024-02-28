function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1; // month starts counting from 0 (January)
  const year = date.getFullYear();

  // add 0 in front of the day if the day is a single digit number
  if (day < 10) {
    day = `0${day}`;
  }

  // add 0 in front of the month if the month is a single digit number
  if (month < 10) {
    month = `0${month}`;
  }

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export default formatDate;
