export const ppLengthOfTime = (lengthOfTime: number) => {
  const days = Math.floor(lengthOfTime / (1000 * 60 * 60 * 24));
  lengthOfTime -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(lengthOfTime / (1000 * 60 * 60));
  lengthOfTime -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(lengthOfTime / (1000 * 60));
  lengthOfTime -= minutes * 1000 * 60;

  const seconds = Math.floor(lengthOfTime / 1000);

  const timeParts = [];
  if (days > 0) timeParts.push(`${days} Day${days > 1 ? "s" : ""}`);
  if (hours > 0) timeParts.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) timeParts.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) timeParts.push(`${seconds} Second${seconds > 1 ? "s" : ""}`);

  return timeParts[0];
};

export const timeLeftToBidString = (endDate: number) => {
  const now = new Date().getTime();
  const timeLeft = endDate - now;
  return `${ppLengthOfTime(timeLeft)} Left to Bid`;
};

export const calcBidUrgency = (endDate: number) => {
  const now = new Date().getTime();
  const timeLeft = endDate - now;

  if (timeLeft < 1000 * 60 * 60 * 24) return "red";
  if (timeLeft < 1000 * 60 * 60 * 24 * 3) return "yellow";
  return "green";
};
