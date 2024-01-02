export const timeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.abs(now - date) / 1000;

  const units = [
    { name: "year", seconds: 60 * 60 * 24 * 365 },
    { name: "month", seconds: 60 * 60 * 24 * 30 },
    { name: "day", seconds: 60 * 60 * 24 },
    { name: "hour", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (let unit of units) {
    if (diffInSeconds >= unit.seconds) {
      const amount = Math.floor(diffInSeconds / unit.seconds);
      return `${amount} ${unit.name}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
