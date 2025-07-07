"use client";
import './honeymoon.css';
import HomeLayout from '../components/HomeLayout';
import Santorini from './posts/santorini';
import Crete from './posts/crete';

export default function HoneymoonPage() {

  return (
    <HomeLayout>
        <Crete/>
        <Santorini/>
    </HomeLayout>
  );
}