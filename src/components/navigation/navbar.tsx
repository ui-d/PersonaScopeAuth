import { useSupabaseClient } from '@supabase/auth-helpers-react';
import * as React from 'react';

export function Navbar(): JSX.Element {
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    //redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className='navbar bg-base-100 pb-24'>
      <div className='navbar-start'>
        <div className='dropdown'></div>
        <a className='btn btn-ghost text-xl normal-case'>🧮 PersonaScope</a>
      </div>

      <div className='navbar-end'>
        <button
          className='rounded bg-red-400 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => handleSignOut()}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
