const formateDate = (date) => {
  return new Date(date).toLocaleDateString("en-US");
};
export const longFormatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export default formateDate;
