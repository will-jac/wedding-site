'use client';
import { Link } from '@mui/material';
import HomeLayout from '../components/HomeLayout';

export default function registry() {
    return <HomeLayout>
        <h1 className="text-2xl font-extrabold text-[#879b88]">Registry</h1>
        <p>Your presence is enough of a present! Please do not feel like you have to get us anything or that we expect you to.</p>
        <br/>
        <p>However, if you do wish to get us a gift, we are registered at <Link href="https://www.williams-sonoma.com/registry/zb68pf9tr7/registry-list.html">Williams Sonoma.</Link></p>
        <br/>
        <p>You can also help <Link href="https://account.venmo.com/u/hannah-curt">contribute</Link> to our honeymoon fund, or just support us in the next phase of our life.</p>
        <br/>
        <p>For our honeymoon, we are going to Greece! We originally planned to go to Greece three years ago, but unfortunately were not able to go. We've been wanting to go ever since, and are excited to get this opportunity to.</p>
        <p>We'll be flying into Athens, then going to the islands of Naxos and Santorini.</p>
    </HomeLayout>
}