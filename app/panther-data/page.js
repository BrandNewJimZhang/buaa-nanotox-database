'use client';


import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

import DirectoryList from '@/components/directory-list';

export default function Home() {

  return (
    <>
      <Header />
      <Sidebar />
      <div className='right-container'>
        <p>
          This is a readme for the Panther Data page. This page is used to parse and display data from the Panther database.
        </p>
        <div>
          <DirectoryList />
        </div>
      </div>
    </>
  );
}
