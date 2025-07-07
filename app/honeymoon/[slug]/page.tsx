"use client";
import { useEffect, useState } from 'react';
import HomeLayout from '../../components/HomeLayout';
import Santorini from '../posts/santorini';
import Crete from '../posts/crete';
import Naxos from '../posts/naxos';
import '../honeymoon.css';

const pages: Record<string, React.FC<{ params: { slug: string } }>> = {
    'santorini': Santorini,
    'crete': Crete,
    'naxos': Naxos
};

export default function HoneymoonPage({ params }: { params: { slug: string } }) {
    const PageComponent = pages[params.slug];
    return (
        <HomeLayout>
            {PageComponent ? <PageComponent params={params} /> : <p>Page Not Found</p>}
        </HomeLayout>
    );
}