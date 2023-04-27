import type { ChartData } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';

import countries from '@/data/countries.json';
import users from '@/data/users.json';

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

const getRandomColor = (): string => {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.5)`;
};

const LABELS = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];

export const useUsersNamesInPopulousCountries = (): ChartData | null => {
  const USERS = users as User;

  const usersNumber = USERS.length;

  const [userNamesInTopCountries, setUserNamesInTopCountries] =
    useState<ChartData | null>(null);

  const uniqueUserCountries = useMemo(
    () => [...new Set(USERS.map((user: Person) => user.location.country))],
    [USERS]
  );

  useEffect(() => {
    const topFiveUserCountriesByPopulation: string[] = countries
      .filter((country) => uniqueUserCountries.includes(country.country))
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)
      .map((country) => country.country);

    const namesByFirstLetterInEachCountry =
      topFiveUserCountriesByPopulation.reduce((acc, country) => {
        acc[country] = countNamesByFirstLetter(
          USERS.filter((user: Person) => user.location.country === country).map(
            (user: Person) => user.name.last
          )
        );
        return acc;
      }, {} as Record<string, Record<string, number>>);

    const datasets = LABELS.map((label) => {
      return {
        label,
        data: topFiveUserCountriesByPopulation.map((country) => {
          return (
            (namesByFirstLetterInEachCountry[country][label] * 100) /
              usersNumber || 0
          );
        }),
        backgroundColor: getRandomColor(),
      };
    });

    const userNamesData: ChartData = {
      labels: topFiveUserCountriesByPopulation,
      datasets,
    };

    setUserNamesInTopCountries(userNamesData);
  }, [USERS, usersNumber, uniqueUserCountries]);

  return userNamesInTopCountries;
};
