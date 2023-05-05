import type { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

const countUsersInAgeRange = (
  usersAge: number[],
  minAge: number,
  maxAge: number
): number => usersAge.filter((age) => age >= minAge && age <= maxAge).length;

export const useUserAgeStats = (users: User): ChartData<'line'> | null => {
  const [ageData, setAgeData] = useState<ChartData<'line'> | null>(null);

  useEffect(() => {
    const usersNumber = users.length;
    const usersAge = users.map((user: Person) => user.dob.age);

    const ageRanges = [
      { label: 'under 16', min: 0, max: 15 },
      { label: '16-25', min: 16, max: 25 },
      { label: '26-45', min: 26, max: 45 },
      { label: '46-65', min: 46, max: 65 },
      { label: '66-85', min: 66, max: 85 },
      { label: 'over 85', min: 86, max: Infinity },
    ];

    const usersInAgeGroups = ageRanges.map(
      ({ min, max }) =>
        (countUsersInAgeRange(usersAge, min, max) / usersNumber) * 100
    );

    const ageStructureData: ChartData<'line'> = {
      labels: ageRanges.map(({ label }) => label),
      datasets: [
        {
          fill: true,
          label: '% of users',
          data: usersInAgeGroups,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    setAgeData(ageStructureData);
  }, [users]);

  return ageData;
};
