export default function getYearRange(startYear, endYear) {
  const years = [];
  startYear = parseInt(startYear, 10);
  endYear = parseInt(endYear, 10);

  while (startYear <= endYear) {
    years.push(startYear);

    startYear += 1;
  }

  return years;
}
