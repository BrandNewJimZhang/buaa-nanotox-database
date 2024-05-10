'use client';

import Header from '@/components/header';
import MainTable from '@/components/main-table';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import Upload from '@/components/upload';
import ImageCalc from '@/components/image-calc';

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
