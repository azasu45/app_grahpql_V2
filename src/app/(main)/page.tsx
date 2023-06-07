import React from 'react';
import dynamic from 'next/dynamic';
import PerfilUpdate from './perfilUpdate';

const Background = dynamic(() => import('./background'), { ssr: false });

export default async function Home() {
   return (
      <section className='pt-24 pb-8 px-8 h-screen bg-slate-600 flex'>
         <Background />
         <PerfilUpdate />
      </section>
   );
}
