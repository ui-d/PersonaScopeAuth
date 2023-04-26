import { useSession } from '@supabase/auth-helpers-react';
import * as React from 'react';

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
          {/* <Seo templateTitle='Home' /> */}
          <Seo />

          <main className='mb-52'></main>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
