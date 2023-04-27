import type { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

import states from '@/data/states.json';
import users from '@/data/users.json';

export const useGenderInTopFiveUsStatesData = (): ChartData | null => {
  const [genderDataInTopFiveStates, setGenderDataInTopFiveStates] =
    useState<ChartData | null>(null);

  useEffect(() => {
    const USERS = users as User;

    const usUsers = USERS.filter(
      (user: Person) =>
        user.location.country === 'United States' && user.location.state
    );

    const uniqueUserStates = [
      ...new Set(usUsers.map((data: Person) => data.location.state)),
    ];

    const topFiveUserStatesByPopulation: string[] = states
      .filter((state) => uniqueUserStates.includes(state.state))
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)
      .map((state) => state.state);

    const femaleUsersInTopFiveStates = topFiveUserStatesByPopulation.map(
      (state) => {
        return usUsers.filter(
          (user: Person) =>
            user.location.state === state && user.gender === 'female'
        ).length;
      }
    );

    const maleUsersInTopFiveStates = topFiveUserStatesByPopulation.map(
      (state) => {
        return usUsers.filter(
          (user: Person) =>
            user.location.state === state && user.gender === 'male'
        ).length;
      }
    );

    const genderInTopFiveUsStatesData: ChartData = {
      labels: topFiveUserStatesByPopulation,
      datasets: [
        {
          label: '% of female',
          data: femaleUsersInTopFiveStates,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '% of male',
          data: maleUsersInTopFiveStates,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    setGenderDataInTopFiveStates(genderInTopFiveUsStatesData);
  }, []);

  return genderDataInTopFiveStates;
};
