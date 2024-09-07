import React, { ReactElement } from 'react';
import Image from "next/image";
import banner from "./banner.jpg";

function MenuItem(props: any) {
    return (
      <a href={props.href}>
        <div className="bg-teal-700 px-4 py-2 rounded-lg text-white text-center">
          {props.children}
        </div>
      </a>
    );
  }
  
  function Menu(props: any) {
    const items = props.children.map((child: any) =>
      <li key={child?.key} className="text-center px-2">
        {child}
      </li>
    );
    return (
      <ul className="grid grid-cols-3 pb-4 content-center">{items}</ul>
    );
  }
  
  function Header() {
    return (
      <div>
        <h1 className="text-4xl p-8 text-center" style={{fontFamily: "Baskerville"}}>
          Jack
          <span className="text-2xl italic">{" & "}</span>
          Hannah
        </h1>
        <Menu>
          <MenuItem key={0} href="#">RSVP</MenuItem>
          <MenuItem key={1} href="#">FAQ</MenuItem>
          <MenuItem key={2} href="#">Registry</MenuItem>
        </Menu>
      </div>
    );
  }
  
  function ThreeButtonRow(props: any) {
    const items = props.children.map((child: ReactElement) =>
      <li key={child?.key} className="text-center px-2">
        <div className="bg-emerald-600 px-4 py-2 rounded-lg">
          <button className="bg-emerald-600 text-white text-center">{child}</button>
        </div>
      </li>
    );
    return (
      <ul className="grid grid-cols-3 pt-4 content-center">{items}</ul>
    );
  }
export default function ImageCard() {
    return (
    <div className="relative bg-dark text-white text-center">
        <div className="h-491px md:h-759px image">
          <Image
            src={banner}
            alt="Picture of Hannah and Jack Kissing :)"
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute top-1/3 md:right-10 rounded-lg p-4 bg-white text-black">
          <h1 className="text-2xl pb-4" >We're getting married!</h1>
            <p>June 1, 2025</p>
            <p>Madison, WI</p>
            <ThreeButtonRow>
              <p key={0}>RSVP</p>
              <p key={1}>Registry</p>
              <p key={2}>Info</p>
            </ThreeButtonRow>
        </div>
        
      </div>
    )
}