"use client"
import { useGlobalContext } from '@/app/context/globalContext';
import { wind } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react'

function Wind() {
    const {forecast} = useGlobalContext();
    const WindSpeed = forecast?.wind?.speed;
    const WindDirection = forecast?.wind?.deg;
   if (!WindSpeed || !WindDirection) {
    return <Skeleton className='h-[12rem] w-full' />
   }


  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none'>
        <h2 className='flex items-center gap-2 font-medium'>{wind} Wind</h2>
        <div className="compass relative flex items-center justify-center bottom-4"> 
            <div className="image relative">
                <Image src="/compass_body.svg" alt="compass_body" width={110} height={110}/>
                <Image src="/compass_arrow.svg" alt="compass_arrow" className='absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert' style={{
                    transform: `translateX(-50%) rotate(${WindDirection}deg)`, 
                    //using the transform property to rotate the image
                    height: "100%",
                }} width={11} height={11}/>
            </div>
            <p className='absolute translate-x-[15%] dark:text-white font-medium'>{Math.round(WindSpeed)}m/s</p>
        </div>
       </div>
  )
}

export default Wind