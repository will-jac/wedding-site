'use client';
import Image from "next/image";
import banner from "./images/banner.jpg";

import HomeLayout from './components/HomeLayout';
import Schedule from "./components/schedule";
import Location from "./components/location";

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


export default function Main() {
  return <div>
  <HomeLayout>
    <div className="p-5 flex flex-col items-center justify-center">
      <Image
        src={banner}
        width={500}
        alt="Picture of Hannah and Jack"
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
</div>
}
