'use client';

import HomeLayout from '../components/HomeLayout';
import Image, { StaticImageData } from "next/image";

import solutionMini from "../images/solution_mini.png";
import solutionConnections from "../images/solution_connections.png";
import solutionBee from "../images/solution_bee.png";
import solutionStrands from "../images/solution_strands.png";
import { Fragment, useState } from 'react';

interface PuzzleSolution {
    title: string;
    image: StaticImageData;
}

export default function Solutions() {

    const puzzleSolutions: PuzzleSolution[] = [
        {
            title: 'Matri-Mini Crossword',
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
    
    // Track which solutions have been revealed
    const [revealedSolutions, setRevealedSolutions] = useState<boolean[]>(
        new Array(puzzleSolutions.length).fill(false)
    );

    // Toggle reveal state when an image is clicked
    const toggleReveal = (index: number) => {
        const newRevealedSolutions = [...revealedSolutions];
        newRevealedSolutions[index] = !newRevealedSolutions[index];
        setRevealedSolutions(newRevealedSolutions);
    };

    return (
        <HomeLayout headerImageSrc="public/Hannah-Jack-ENG-AKP-6.17.24-196.jpg">
            {puzzleSolutions.map((s, index) => (
                <Fragment key={s.title}>
                    <h1 className="text-2xl font-extrabold text-[#879b88]">{s.title}</h1>
                    <div className="relative cursor-pointer" onClick={() => toggleReveal(index)}>
                        <Image
                            src={s.image}
                            width={500}
                            alt={`Solution for the ${s.title} puzzle`}
                            className={`object-cover pb-10 transition-all duration-300 ${!revealedSolutions[index] ? 'blur-lg' : ''}`}
                            priority
                        />
                        {!revealedSolutions[index] && (
                            <div className="absolute inset-0 flex items-center justify-center pb-10">
                                <span className="bg-[#879b88] text-white px-4 py-2 rounded-md shadow">
                                    Click to reveal solution
                                </span>
                            </div>
                        )}
                    </div>
                </Fragment>
            ))}
            <p>We are very grateful to Chris Curtis, Ben Curtis, and Nafis Zaman for creating and testing these fantastic puzzles! We hope you enjoyed them as much as we did.</p>
        </HomeLayout>
    );
}
