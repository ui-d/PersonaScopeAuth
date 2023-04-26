import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import * as React from 'react';

const HomePage = (): JSX.Element => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className='container mx-auto max-w-xl px-5 py-20'>
      {!session ? (
        <Auth
          providers={['github']}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='dark'
        />
      ) : (
        <Link className='underline underline-offset-4' href='/'>
          Go to dashboard ➡️
        </Link>
      )}
    </div>
  );
};

export default HomePage;
