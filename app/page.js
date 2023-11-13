'use client';

import Header from '@/components/header';
import MainTable from '@/components/main-table';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

  return (
    <>
      <Header />
      <MainTable />
    </>
  );
}
