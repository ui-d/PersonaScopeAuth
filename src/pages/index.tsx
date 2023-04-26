import * as React from 'react';

import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

export default function HomePage(): JSX.Element {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='mb-52'></main>
    </Layout>
  );
}
