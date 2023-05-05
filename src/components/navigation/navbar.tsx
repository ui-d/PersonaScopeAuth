import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import * as React from 'react';

export function Navbar(): JSX.Element {
  const supabase = useSupabaseClient();
  const session = useSession();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <header className='navbar bg-base-100 pb-24'>
      <div className='navbar-start'>
        <div className='dropdown'></div>
        <a className='btn btn-ghost text-xl normal-case'>🧮 PersonaScope</a>
      </div>

      <div className='navbar-end'>
        {session ? (
          <button
            className='rounded bg-gray-600 px-4 py-2 font-bold text-white hover:bg-gray-700'
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>
        ) : (
          <Link
            className='rounded bg-gray-600 px-4 py-2 font-bold text-white hover:bg-gray-700'
            href='/login'
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
