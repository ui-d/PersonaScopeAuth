import type { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

import users from '@/data/users.json';

interface User {
  name: {
    last: string;
  };
}

const countNamesByFirstLetter = (names: string[]): Record<string, number> => {
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

export const useUsersNamesGlobalStats = (): ChartData | null => {
  const [userNamesData, setUserNamesData] = useState<ChartData | null>(null);

  useEffect(() => {
    const userLastNames: string[] = users.map((user: User) => user.name.last);
    const namesByFirstLetter = countNamesByFirstLetter(userLastNames);

    const labels = 'MNOPQRSTUVWXYZ'.split('');
    const percentageOfNamesArray = labels.map(
      (letter) =>
        ((namesByFirstLetter[letter] || 0) / userLastNames.length) * 100
    );

    const sumOfPercentages = percentageOfNamesArray.reduce(
      (sum, percentage) => sum + percentage,
      0
    );
    const restOfNames = 100 - sumOfPercentages;

    const backgroundColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 939, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgb(75, 192, 192, 0.2)',
      'rgb(153, 102, 255, 0.2)',
      'rgb(255, 159, 64, 0.2)',
      'rgb(215, 49, 64, 0.2)',
      'rgb(135, 19, 64, 0.2)',
    ];

    const borderColors = backgroundColors.map((color) =>
      color.replace('0.2', '1')
    );

    const userNamesData: ChartData = {
      labels: [...labels, 'Rest'],
      datasets: [
        {
          label: 'number of names',
          data: [...percentageOfNamesArray, restOfNames],
          backgroundColor: [...backgroundColors, 'rgba(255, 19, 64, 0.2)'],
          borderColor: [...borderColors, 'rgb(255, 19, 64, 1)'],
          borderWidth: 1,
        },
      ],
    };

    setUserNamesData(userNamesData);
  }, []);

  return userNamesData;
};
