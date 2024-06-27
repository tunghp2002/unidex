export function formatNumber(number: number) {
  let formattedNumber = number.toFixed(4);
  
  formattedNumber = formattedNumber.replace(/0+$/, '');
  
  if (formattedNumber.endsWith('.')) {
      formattedNumber = formattedNumber.slice(0, -1);
  }

  return formattedNumber;
}
