'use client';

import HomeLayout from '../components/HomeLayout';
import { CaptionView } from '../components/gallery/views';
import { ImageProps } from '../components/gallery/utils/types';

interface Person {
    key: string,
    portrait: boolean,
    fname: string,
    lname: string,
    snippet: string,
}

const brideppl: Person[] = [
    { 
        key: "HJ-Sneak-2.jpg", portrait: true,
        fname: "Emily", lname: "Curtis",
        snippet: "Maid of Honnor, Hannah's Sister"
    },
    { 
        key: "HJ-Sneak-2.jpg", portrait: true,
        fname: "Liza", lname: "Williams",
        snippet: "Jack's Sister"
    },
];
const groomppl: Person[] = [
    { 
        key: "HJ-Sneak-2.jpg", portrait: true,
        fname: "Henry", lname: "Williams",
        snippet: "Best Man, Jack's Twin Brother"
    },
    { 
        key: "HJ-Sneak-2.jpg", portrait: true,
        fname: "Max", lname: "Williams",
        snippet: "Jack's Brother"
    },
];

export default function Travel() {
    const b: ImageProps[] = brideppl.map(p => {
        return {
            caption: <div><b>{p.fname} {p.lname}</b><p>{p.snippet}</p></div>, 
            ...p
        } as ImageProps;
    });
    const g: ImageProps[] = groomppl.map(p => {
        return {
            caption: <div><b>{p.fname} {p.lname}</b><p>{p.snippet}</p></div>, 
            ...p
        } as ImageProps;
    });
    return <HomeLayout isGalleryWidth={true}>
        <h1 className="text-2xl font-extrabold text-[#879b88]">Wedding Party</h1>
        <CaptionView images={b}></CaptionView>
        <CaptionView images={g}></CaptionView>
    </HomeLayout>;
}