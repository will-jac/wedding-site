'use server';
import Image from "next/image";
import banner from "./images/banner.jpg";

import HomeLayout from './components/HomeLayout';
import FAQ from "./components/faq";
import Story from "./components/story";
import Schedule from "./components/schedule";
import Location from "./components/location";
import Hotel from "./components/hotel";
import Travel from "./components/travel";

import { ThemeProvider } from '@mui/material/styles';
import { ButtonTheme } from './styles';
import { Button } from '@mui/material';

function RSVPButton(props: any) {
  'use client';
  return <ThemeProvider theme={ButtonTheme}>
    <Button variant="contained" href="rsvp">
      <p className="text-2xl">RSVP</p>
    </Button>
  </ThemeProvider>
}


export default async function Main() {
  return <div>
  <HomeLayout>
    <div className="p-5 flex flex-col items-center justify-center">
      <Image
        src={banner}
        width={500}
        alt="Picture of Hannah and Jack Kissing :)"
        className="object-cover pb-10"
        priority
      />

      <p className="text-xl xl:text-3xl font-extrabold text-[#879b88] text-center">Sunday, June 1, 2025</p>
      <p className="text-xl xl:text-3xl font-extrabold text-[#879b88] text-center pb-5">Madison, WI</p>
      <RSVPButton/>
    </div>

    <Location/>

    <Schedule/>
{/* 
    <Hotel/>

    <Travel/> */}

    <div className="pb-10"/>
  </HomeLayout>
  <section className="flex justify-end bg-[#879b88]" id="about">
    <div className="mx-20 my-5">
      <p>Made by Jack</p>
      <a 
        href="https://github.com/will-jac/wedding-site" 
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        rel="noopener noreferrer">Source Code</a>
    </div>
  </section>
</div>
}
