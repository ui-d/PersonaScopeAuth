import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import * as React from 'react';

const HomePage = (): JSX.Element => {
  const session = useSession();
  const supabase = useSupabaseClient();

  // if user logged in, redirect to dashboard
  React.useEffect(() => {
    if (session) {
      window.location.href = '/';
    }
  }, [session]);

  return (
    <div className='container mx-auto max-w-xl px-5 py-20'>
      {!session && (
        <Auth
          providers={['github']}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme='dark'
        />
      )}
    </div>
  );
};

export default HomePage;
