"use client";
import './honeymoon.css';
import HomeLayout from '../components/HomeLayout';
import Santorini from './posts/santorini';
import Crete from './posts/crete';
import Naxos from './posts/naxos';

export default function HoneymoonPage() {

  return (
    <HomeLayout>
        <Naxos/>
        <Crete/>
        <Santorini/>
    </HomeLayout>
  );
}