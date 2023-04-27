import type { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

export const useGenderGlobalStats = (users: User): ChartData | null => {
  const [genderGlobal, setGenderGlobal] = useState<ChartData | null>(null);

  useEffect(() => {
    const totalNumberOfUsers = users.length;

    const femaleUsersNumber = users.filter((user: Person) => {
      return user.gender === 'female';
    }).length;

    const femalePercentage = (femaleUsersNumber * 100) / totalNumberOfUsers;
    const malePercantage = 100 - femalePercentage;

    const genderData: ChartData = {
      labels: ['Female', 'Male'],
      datasets: [
        {
          label: '% of this gender',
          data: [femalePercentage, malePercantage],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };

    setGenderGlobal(genderData);
  }, [users]);

  return genderGlobal;
};
