/**
 * ISODateString function
 * Accepts date object and returns in ISO date string format
 * @param {date} dateObj   date object eg: 2023-12-23T20:30:00.000Z
 * @return {string}        ISO format date string eg: "2023-12-03"
 */
export default function toISODateString(dateObj) {
  const myDate = new Date(dateObj);
  const dayOfMonth = myDate.getDate();
  const month = myDate.getMonth();
  const year = myDate.getFullYear();
  const pad = (n) => (n < 10 ? "0" + n : n);    // 'pad' helper function just adds a leading '0' when needed
  return year + "-" + pad(month + 1) + "-" + pad(dayOfMonth);
}