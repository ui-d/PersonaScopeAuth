import type { ChartData } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';

import states from '@/data/states.json';

import { countNamesByFirstLetter, getRandomColor } from '@/utils/helpers';

const LABELS = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];

export const useUsersNamesInPopulousUsStatesStats = (
  users: User
): ChartData | null => {
  const [userNamesData, setUserNamesData] = useState<ChartData | null>(null);

  const usUsers = useMemo(() => {
    return users.filter(
      (user: Person) =>
        user.location.country === 'United States' && user.location.state
    );
  }, [users]);

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
        backgroundColor: getRandomColor(),
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
