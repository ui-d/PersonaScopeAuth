import type { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

import users from '@/data/users.json';

const countUsersInAgeRange = (
  usersAge: number[],
  minAge: number,
  maxAge: number
): number => usersAge.filter((age) => age >= minAge && age <= maxAge).length;

export const useUserAgeStats = (): ChartData | null => {
  const [ageData, setAgeData] = useState<ChartData | null>(null);

  useEffect(() => {
    const usersAge = users.map((user) => user.dob.age);

    const ageRanges = [
      { label: 'under 16', min: 0, max: 15 },
      { label: '16-25', min: 16, max: 25 },
      { label: '26-45', min: 26, max: 45 },
      { label: '46-65', min: 46, max: 65 },
      { label: '66-85', min: 66, max: 85 },
      { label: 'over 85', min: 86, max: Infinity },
    ];

    const usersInAgeGroups = ageRanges.map(({ min, max }) =>
      countUsersInAgeRange(usersAge, min, max)
    );

    const ageStructureData = {
      labels: ageRanges.map(({ label }) => label),
      datasets: [
        {
          fill: true,
          label: 'Users in age group',
          data: usersInAgeGroups,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    setAgeData(ageStructureData);
  }, []);

  return ageData;
};
