'use client';
import {useEffect, useState} from "react";
import { Suspense } from 'react'
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSearchParams, useRouter } from 'next/navigation';

import getImages from "../components/gallery/utils/getImages";
import HomeLayout from '../components/HomeLayout';
import { GridView, GalleryView, CaroselView } from "../components/gallery/views";

import Modal from "../components/gallery/modal";

function Photos() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const photoId = searchParams.get('photoId');

  const [images, setImages] = useState([] as string[]);
  const [index, setIndex] = useState(null as number | null); // currently selected photo
  const [prefix, setPrefix] = useState('');
  const [view, setView] = useState('grid');
  
  function changePhotoId(newIndex: number) {
    if (newIndex < 0 || newIndex >= images.length) return;
    setIndex(newIndex);
    // router.push(
    //   `/photos?photoId=${images[newIndex]}`,
    // );
  }

  function setPhotoId(id: string) {
    setIndex(images.indexOf(id));
  }

  function onClose() {
    // router.push("/photos");
    setIndex(null);
    console.log('closing');
  }

  useEffect(() => {
    getImages().then((images) => {
      setImages(images);
    });
  }, []);
  
  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?

  return <HomeLayout isGalleryWidth={true}>
      <div className="flex justify-between items-center py-5">
        <h1>Click on a photo to open it in a larger resolution</h1>
        <ToggleButtonGroup
          color="primary"
          value={view}
          exclusive
          onChange={(_, x) => setView(x)}
          aria-label="View type"
        >
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="gallery">Gallery</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {view === 'grid' &&     <GridView images={images} setPhotoId={setPhotoId} />}
      {view === 'gallery' &&  <GalleryView images={images} setPhotoId={setPhotoId} />}
      {index != null && <CaroselView 
        images={images} 
        index={index} 
        setIndex={changePhotoId} onClose={onClose}
      />}
      
    </HomeLayout>
}

// todo: wrap this in a more inner scope
export default function Main() {
  return <Suspense fallback={<div>Loading...</div>}>
    <Photos />
  </Suspense>
}