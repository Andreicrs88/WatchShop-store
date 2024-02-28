function formatPhoneNumber(number) {
  const firstFourDigitsGroup = number.slice(0, 4);
  // console.log(firstFourDigitsGroup);
  const secondGroup = number.slice(4, 7);
  // console.log(secondGroup);
  const lastGroup = number.slice(7, 10);
  // console.log(lastGroup);

  const formattedNumber = `${firstFourDigitsGroup}.${secondGroup}.${lastGroup}`;
  return formattedNumber;
}

export default formatPhoneNumber;
