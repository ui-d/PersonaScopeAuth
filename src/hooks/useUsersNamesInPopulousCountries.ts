import type { ChartData } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';

import states from '@/data/states.json';
import users from '@/data/users.json';

export const StackedBarChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const LABELS = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];

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

export const useUsersNamesInPopulousUsStatesStats = (): ChartData | null => {
  const USERS = users as User;
  const [userNamesData, setUserNamesData] = useState<ChartData | null>(null);

  const usUsers = useMemo(() => {
    return USERS.filter(
      (user: Person) =>
        user.location.country === 'United States' && user.location.state
    );
  }, [USERS]);

  useEffect(() => {
    const usUsersNumber = usUsers.length;

    const uniqueUserStates = [
      ...new Set(usUsers.map((data: Person) => data.location.state)),
    ];

    const topFiveUserStatesByPopulation: string[] = states
      .filter((state) => uniqueUserStates.includes(state.state))
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)
      .map((state) => state.state);

    const namesByFirstLetterInEachState = topFiveUserStatesByPopulation.reduce(
      (acc, state) => {
        acc[state] = countNamesByFirstLetter(
          usUsers
            .filter((user: Person) => user.location.state === state)
            .map((user: Person) => user.name.last)
        );
        return acc;
      },
      {} as Record<string, Record<string, number>>
    );

    const datasets = LABELS.map((label) => {
      return {
        label,
        data: topFiveUserStatesByPopulation.map((state) => {
          return (
            (namesByFirstLetterInEachState[state][label] * 100) /
              usUsersNumber || 0
          );
        }),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      };
    });

    const userNamesData: ChartData = {
      labels: [...topFiveUserStatesByPopulation],
      datasets: [...datasets],
    };

    setUserNamesData(userNamesData);
  }, [usUsers]);

  return userNamesData;
};
