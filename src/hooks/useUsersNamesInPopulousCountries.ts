import type { ChartData } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';

import countries from '@/data/countries.json';

import { countNamesByFirstLetter, getRandomColor } from '@/utils/helpers';

const LABELS = ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'];

export const useUsersNamesInPopulousCountries = (
  users: User
): ChartData<'bar'> | null => {
  const usersNumber = users.length;

  const [userNamesInTopCountries, setUserNamesInTopCountries] =
    useState<ChartData<'bar'> | null>(null);

  const uniqueUserCountries = useMemo(
    () => [...new Set(users.map((user: Person) => user.location.country))],
    [users]
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
          users
            .filter((user: Person) => user.location.country === country)
            .map((user: Person) => user.name.last)
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

    const userNamesData: ChartData<'bar'> = {
      labels: topFiveUserCountriesByPopulation,
      datasets,
    };

    setUserNamesInTopCountries(userNamesData);
  }, [users, usersNumber, uniqueUserCountries]);

  return userNamesInTopCountries;
};
