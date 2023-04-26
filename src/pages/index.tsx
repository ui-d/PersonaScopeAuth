import { useSession } from '@supabase/auth-helpers-react';
import * as React from 'react';

import { Container } from '@/components/containers/Container';
import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

const HomePage = (): JSX.Element => {
  const session = useSession();

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
                <div className='flex w-full grid-flow-row grid-cols-12  gap-4 overflow-y-hidden overflow-x-scroll px-10 pb-10 pt-1 xl:grid xl:overflow-x-auto xl:px-4'></div>
              </Container>
            </>
          </main>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
