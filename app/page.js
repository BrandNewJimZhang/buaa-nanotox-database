'use client';

import Header from '@/components/header';
import MainTable from '@/components/main-table';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/sidebar';
import HomeText from '@/components/home-text';

export default function Home() {

  return (
    <>
      <Header />
      <Sidebar />
      <HomeText />
    </>
  );
}
