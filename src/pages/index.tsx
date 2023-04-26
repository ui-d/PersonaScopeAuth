import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import * as React from 'react';

import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

const HomePage = (): JSX.Element => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <></>
      ) : (
        <Layout>
          {/* <Seo templateTitle='Home' /> */}
          <Seo />

          <main className='mb-52'>
            <button
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </main>
        </Layout>
      )}
    </>
  );
};

export default HomePage;
