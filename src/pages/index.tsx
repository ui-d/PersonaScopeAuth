import { useSession } from '@supabase/auth-helpers-react';
import { ChartData } from 'chart.js';
import * as React from 'react';

import { useGenderGlobalStats } from '@/hooks/useGenderGlobalStats';
import { useGenderInTopFiveCountriesData } from '@/hooks/useGenderPopulousCountriesStats';

import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { Container } from '@/components/containers/Container';
import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

const HomePage = (): JSX.Element => {
  const session = useSession();

  const genderGlobal = useGenderGlobalStats() as NonNullable<ChartData<'pie'>>;
  const genderDataInTopCountries =
    useGenderInTopFiveCountriesData() as NonNullable<ChartData<'bar'>>;

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
