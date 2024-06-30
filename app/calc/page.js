'use client';

import Header from '@/components/header';

import Sidebar from '@/components/sidebar';
import Upload from '@/components/upload';

export default function Home() {

  return (
    <>
      <Header />
      <Sidebar />
      <div className='right-container'>
        <Upload />
      </div>
    </>
  );
}
