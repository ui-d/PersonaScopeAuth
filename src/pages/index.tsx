import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { useGenderGlobalStats } from '@/hooks/useGenderGlobalStats';
import { useGenderInTopFiveCountriesData } from '@/hooks/useGenderPopulousCountriesStats';
import { useGenderInTopFiveUsStatesData } from '@/hooks/useGenderPopulousUsStatesStats';
import { useUserAgeStats } from '@/hooks/useUserAgeStats';
import { useUsersNamesGlobalStats } from '@/hooks/useUsersNamesGlobalStats';
import { useUsersNamesInPopulousCountries } from '@/hooks/useUsersNamesInPopulousCountries';
import { useUsersNamesInPopulousUsStatesStats } from '@/hooks/useUsersNamesInPopulousUsStatesStats';

import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { DoughnutChart } from '@/components/charts/DoughnutChart';
import { PieChart } from '@/components/charts/PieChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { Container } from '@/components/containers/Container';
import { Layout } from '@/components/layout/Layout';
import { Navbar } from '@/components/navigation/navbar';
import { Seo } from '@/components/Seo';

import { StackedBarChartOptions } from '@/utils/chartConfigs';

interface HomePageProps {
  users: User;
}
const HomePage = ({ users }: HomePageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const supabase = useSupabaseClient();

  const genderGlobal = useGenderGlobalStats(users);
  const genderDataInTopCountries = useGenderInTopFiveCountriesData(users);
  const genderDataInTopUsStates = useGenderInTopFiveUsStatesData(users);
  const ageStructureData = useUserAgeStats(users);
  const usersNamesGlobalStats = useUsersNamesGlobalStats(users);
  const usersNamesInPopulousUsStatesStats =
    useUsersNamesInPopulousUsStatesStats(users);
  const usersNamesInPopulousCountries = useUsersNamesInPopulousCountries(users);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  if (isLoading) {
    return (
      <div className='pt-32 text-center text-3xl font-bold text-black'>
        Loading...
      </div>
    );
  }

  return (
    <>
      {!session ? (
        <>
          <Navbar />
          <h1 className='text-center text-3xl font-bold'>
            Welcome to trial project for Bloomtech
          </h1>
        </>
      ) : (
        <Layout>
          <Seo templateTitle='Dashboard' />
          <Seo />

          <main className='mb-52'>
            <>
              <Container>
                <div className='flex grid w-full grid-flow-row grid-cols-12 gap-4 overflow-y-hidden overflow-x-scroll px-10 pb-10 pt-1 xl:overflow-x-auto xl:px-4'>
                  {genderGlobal !== null && (
                    <PieChart
                      data={genderGlobal}
                      title='Global gender structure'
                      description='Percentage of users that are female in the total population'
                      tags={['gender', 'global']}
                      isNew
                    />
                  )}
                  {genderDataInTopCountries !== null && (
                    <BarChart
                      data={genderDataInTopCountries}
                      title='Gender in most populous countries'
                      description='Percentage of each gender in the top 5 most populous countries'
                      tags={['gender', 'countries', 'top 5']}
                      isNew
                    />
                  )}
                  {genderDataInTopUsStates !== null && (
                    <BarChart
                      data={genderDataInTopUsStates}
                      title='Gender in most populous states'
                      description='Percentage of each gender in the top 5 most populous states'
                      tags={['gender', 'states', 'top 5']}
                      isNew
                    />
                  )}
                  {ageStructureData !== null && (
                    <AreaChart
                      data={ageStructureData}
                      title='Percentage of users in age groups'
                      description='Percentage of global users in each of the following age groups: under 16, 16-25,
26-45, 46-65, 66-85, over 85'
                      tags={['age', 'global']}
                    />
                  )}

                  {usersNamesGlobalStats !== null && (
                    <DoughnutChart
                      data={usersNamesGlobalStats}
                      title='Names starting with N-Z'
                      description='Percentage of global users whose last names start with the letters N-Z'
                      tags={['names', 'global']}
                    />
                  )}

                  {usersNamesInPopulousUsStatesStats !== null && (
                    <StackedBarChart
                      data={usersNamesInPopulousUsStatesStats}
                      options={StackedBarChartOptions}
                      title='Names starting with N-Z in most populous states'
                      description='Percentage of American users from most populous states, whose last names start with the letters N-Z'
                      tags={['names', 'global', 'top 5', 'states']}
                    />
                  )}
                  {usersNamesInPopulousCountries !== null && (
                    <StackedBarChart
                      data={usersNamesInPopulousCountries}
                      options={StackedBarChartOptions}
                      title='Names starting with N-Z in top populous countries'
                      description='Percentage of users from most populous countries, whose last names start with the letters N-Z'
                      tags={['names', 'global', 'top 5', 'countries']}
                      isFullWidth
                    />
                  )}
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

export async function getStaticProps() {
  let users = [];

  try {
    const response = await axios.get('https://randomuser.me/api/?results=3000');
    users = response.data.results;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching users:', error);
  }

  return {
    props: {
      users,
    },
  };
}
