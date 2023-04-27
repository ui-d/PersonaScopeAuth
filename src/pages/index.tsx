import { useSession } from '@supabase/auth-helpers-react';
import { ChartData } from 'chart.js';
import * as React from 'react';

import { useGenderGlobalStats } from '@/hooks/useGenderGlobalStats';
import { useGenderInTopFiveCountriesData } from '@/hooks/useGenderPopulousCountriesStats';
import { useGenderInTopFiveUsStatesData } from '@/hooks/useGenderPopulousUsStatesStats';
import { useUserAgeStats } from '@/hooks/useUserAgeStats';
import { useUsersNamesGlobalStats } from '@/hooks/useUsersNamesGlobalStats';
import {
  StackedBarChartOptions,
  useUsersNamesInPopulousUsStatesStats,
} from '@/hooks/useUsersNamesInPopulousUsStatesStats';

import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { DoughnutChart } from '@/components/charts/DoughnutChart';
import { PieChart } from '@/components/charts/PieChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { Container } from '@/components/containers/Container';
import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

const HomePage = (): JSX.Element => {
  const session = useSession();

  const genderGlobal = useGenderGlobalStats() as NonNullable<ChartData<'pie'>>;
  const genderDataInTopCountries =
    useGenderInTopFiveCountriesData() as NonNullable<ChartData<'bar'>>;
  const genderDataInTopUsStates =
    useGenderInTopFiveUsStatesData() as NonNullable<ChartData<'bar'>>;
  const ageStructureData = useUserAgeStats() as NonNullable<ChartData<'line'>>;
  const usersNamesGlobalStats = useUsersNamesGlobalStats() as NonNullable<
    ChartData<'doughnut'>
  >;
  const usersNamesInPopulousUsStatesStats =
    useUsersNamesInPopulousUsStatesStats() as NonNullable<ChartData<'bar'>>;

  return (
    <>
      {!session ? (
        <></>
      ) : (
        <Layout>
          <Seo templateTitle='Dashboard' />
          <Seo />

          <main className='mb-52'>
            <>
              <Container>
                <div className='flex w-full grid-flow-row grid-cols-12  gap-4 overflow-y-hidden overflow-x-scroll px-10 pb-10 pt-1 xl:grid xl:overflow-x-auto xl:px-4'>
                  <PieChart
                    data={genderGlobal}
                    title='Gender structure'
                    description='Percentage of users that are female in the total population'
                    tags={['gender', 'global']}
                    isNew
                  />
                  <BarChart
                    data={genderDataInTopCountries}
                    title='Gender in countries'
                    description='The population of each of the top 5 most populous countries'
                    tags={['gender', 'countries', 'top 5']}
                    isNew
                  />
                  <BarChart
                    data={genderDataInTopUsStates}
                    title='Gender in countries'
                    description='The population of each of the top 5 most populous countries'
                    tags={['gender', 'countries', 'top 5']}
                    isNew
                  />
                  <AreaChart
                    data={ageStructureData}
                    title='Percentage of users in age groups'
                    description='Percentage of users in each of the following age groups: under 16, 16-25,
26-45, 46-65, 66-85, over 85'
                    tags={['age', 'global']}
                  />
                  <DoughnutChart
                    data={usersNamesGlobalStats}
                    title='Names starting with N-Z'
                    description='Percentage of global users whose last names start with the letters N-Z'
                    tags={['names', 'global']}
                  />
                  <StackedBarChart
                    data={usersNamesInPopulousUsStatesStats}
                    options={StackedBarChartOptions}
                    title='Names starting with N-Z in top states'
                    description='Percentage of American users from most populous states, whose last names start with the letters N-Z'
                    tags={['names', 'global']}
                  />
                </div>
              </Container>
            </>
          </main>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
