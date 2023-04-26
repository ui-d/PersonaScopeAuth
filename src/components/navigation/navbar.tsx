import { useSupabaseClient } from '@supabase/auth-helpers-react';
import * as React from 'react';

export function Navbar(): JSX.Element {
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    //redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className='navbar bg-base-100 pb-24'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow'
          >
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a className='justify-between'>
                Parent
                <svg
                  className='fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' />
                </svg>
              </a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost text-xl normal-case'>🧮 PersonaScope</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <button
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => handleSignOut()}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
