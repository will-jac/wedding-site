'use client';

import HomeLayout from '../components/HomeLayout';
import Image, { StaticImageData } from "next/image";

import solutionMini from "../images/solution_mini.png";
import solutionConnections from "../images/solution_connections.png";
import solutionBee from "../images/solution_bee.png";
import solutionStrands from "../images/solution_strands.png";
import { Fragment } from 'react';

interface PuzzleSolution {
    title: string;
    image: StaticImageData;
}

export default function Solutions() {

    const puzzleSolutions: PuzzleSolution[] = [
        {
            title: 'Down the Aisle',
            image: solutionMini,
        },
        {
            title: 'Love Connections',
            image: solutionConnections,
        },
        {
            title: 'Wedding Bee',
            image: solutionBee,
        },
        {
            title: 'Heart Strands',
            image: solutionStrands,
        },
    ];

    return (
        <HomeLayout headerImageSrc="engagement/Hannah-Jack-ENG-AKP-6.17.24-196.jpg">
            {puzzleSolutions.map(s => (
                <Fragment key={s.title}>
                    <h1 className="text-2xl font-extrabold text-[#879b88]">{s.title}</h1>
                    <Image
                        src={s.image}
                        width={500}
                        alt={`Solution for the ${s.title} puzzle`}
                        className="object-cover pb-10"
                        priority
                    />
                </Fragment>
            ))}
        </HomeLayout>
    );
}