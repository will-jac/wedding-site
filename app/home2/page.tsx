import React, { ReactElement } from 'react';
import Image from "next/image";
import kissing from "./banner2.jpg";

function ThreeButtonRow(props: any) {
  const items = props.children.map((child: ReactElement) =>
    <li key={child?.key} className="text-center px-2">
      <div className="bg-teal-700 px-4 py-2 rounded-lg">
        <button className="bg-teal-700 text-white text-center">{child}</button>
      </div>
    </li>
  );
  return (
    <ul className="grid grid-cols-3 pt-4 content-center">{items}</ul>
  );
}

export default function Home() {
  return (
    <section>
      <div className="md:w-1/2 md:h-1/4 absolute top-1/4 md:left-20 rounded-lg p-6 bg-white text-black">
        <h1 className="text-4xl pb-8" >Jack & Hannah</h1>
          <p>June 1, 2025</p>
          <p>Madison, WI</p>
          <ThreeButtonRow>
            <p key={0}>RSVP</p>
            <p key={1}>Registry</p>
            <p key={2}>Info</p>
          </ThreeButtonRow>
      </div>
      <div className="image">
        <Image
          src={kissing}
          alt="Picture of Hannah and Jack Kissing :)"
          className="overflow-hidden"
          priority
        />
      </div>
      <div>Hi :)</div>
    </section>
  );
}