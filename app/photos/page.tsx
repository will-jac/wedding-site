'use client';
import {useEffect, useState} from "react";
import Image from "next/image";
import getImages from "../components/gallery/utils/getImages";
import HomeLayout from '../components/header';

export default function Photos() {
  const [images, setImages] = useState([] as string[]);
  const [prefix, setPrefix] = useState('');
  
  useEffect(() => {
    getImages().then((images) => {
      setImages(images);
    });
  }, []);
  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?
  
  return <div>
    <HomeLayout isGalleryWidth={true}>
      <h1>Engagement Photos</h1>
      <div className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">

          {images.map((image, index) => (
            <Image 
              key={index} 
              src={image} 
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              width={720} 
              height={480}
              quality={50}
              sizes="(max-width: 640px) 100vw,
//                     (max-width: 1280px) 50vw,
//                     (max-width: 1536px) 33vw,
//                     25vw"
              alt={"An engagement photo of Jack and Hannah"}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  </div>;
}