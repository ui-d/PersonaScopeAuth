import type { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

import countries from '@/data/countries.json';
import users from '@/data/users.json';

export const useGenderInTopFiveCountriesData = (): ChartData | null => {
  const [genderDataInTopCountries, setGenderDataInTopCountries] =
    useState<ChartData | null>(null);

  useEffect(() => {
    const USERS = users as User;

    const uniqueUserCountries = [
      ...new Set(USERS.map((user: Person) => user.location.country)),
    ];

    const topFiveUserCountriesByPopulation: string[] = countries
      .filter((country) => uniqueUserCountries.includes(country.country))
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)
      .map((country) => country.country);

    const femaleUsersInTopFiveCountries = topFiveUserCountriesByPopulation.map(
      (country) => {
        return USERS.filter(
          (user: Person) =>
            user.location.country === country && user.gender === 'female'
        ).length;
      }
    );

    const maleUsersInTopFiveCountries = topFiveUserCountriesByPopulation.map(
      (country) => {
        return USERS.filter(
          (user: Person) =>
            user.location.country === country && user.gender === 'male'
        ).length;
      }
    );

    const femaleUsersInTopFiveCountriesPercentage =
      femaleUsersInTopFiveCountries.map((femaleUsers, index) => {
        const maleUsers = maleUsersInTopFiveCountries[index];
        const totalUsers = femaleUsers + maleUsers;
        return Math.round((femaleUsers / totalUsers) * 100);
      });

    const maleUsersInTopFiveCountriesPercentage =
      maleUsersInTopFiveCountries.map((maleUsers, index) => {
        const femaleUsers = femaleUsersInTopFiveCountries[index];
        const totalUsers = femaleUsers + maleUsers;
        return Math.round((maleUsers / totalUsers) * 100);
      });

    const genderInTopFiveCountriesData: ChartData = {
      labels: topFiveUserCountriesByPopulation,
      datasets: [
        {
          label: 'Female',
          data: femaleUsersInTopFiveCountriesPercentage,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Male',
          data: maleUsersInTopFiveCountriesPercentage,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    setGenderDataInTopCountries(genderInTopFiveCountriesData);
  }, []);

  return genderDataInTopCountries;
};
