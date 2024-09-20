'use client'
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import {ThemeDropDown} from "../components/ThemeDropDown/ThemeDropDown"
import SearchDialog from "../components/SearchDialog/SearchDialog"
import { useGlobalContext } from '../context/globalContext';

function Navbar() {
  const router = useRouter();
  const {state} = useGlobalContext();

  return (
    <div className='w-full py-4 flex items-center justify-between'>
      <h1 className='font-bold text-xl'>WidgetHub </h1>
      <div className='left'></div>
      <div className='search-container flex shrink-0 w-full gap-2 sm:w-fit'></div>
      <SearchDialog/>
      <ThemeDropDown/>

      <div className="btn-group flex items-center gap-2">
      <Button className='source-code flex items-center gap-2 ' onClick={() => { router.push("https://github.com/Aparnaa-k "); }}>
        <Github size={16} /> Source Code
      </Button>
      </div>
    </div>
  );
}

export default Navbar;
