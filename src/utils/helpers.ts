export const getRandomColor = (): string => {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.5)`;
};

export const countNamesByFirstLetter = (
  names: string[]
): Record<string, number> => {
  const namesByFirstLetter: Record<string, number> = {};

  for (const name of names) {
    const firstLetter = name[0].toUpperCase();

    if (firstLetter >= 'M' && firstLetter <= 'Z') {
      namesByFirstLetter[firstLetter] =
        (namesByFirstLetter[firstLetter] || 0) + 1;
    }
  }

  return namesByFirstLetter;
};
