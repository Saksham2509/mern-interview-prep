export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (title) => {
  // Return empty string for any falsy value or non-string values
  if (!title || typeof title !== 'string') return "";

  const words = title.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i] && words[i].length > 0) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};