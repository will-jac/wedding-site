import React, { ReactElement } from 'react';
import Image from "next/image";
import banner from "./banner.jpg";
import Title from './title';
import TitleRow from './Menu';

export default function Home() {
  return (
    <div>
      <div className="pt-8 md:px-20 text-center">
        <Title>Jack & Hannah</Title>
        <TitleRow/>
        
      </div>
    </div>
  );
}