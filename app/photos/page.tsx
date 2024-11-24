'use client';
import {useEffect, useState} from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSearchParams, useRouter } from 'next/navigation';

import getImages from "../components/gallery/utils/getImages";
import HomeLayout from '../components/HomeLayout';
import { GridView, GalleryView, CaroselView } from "../components/gallery/views";

import Modal from "../components/gallery/modal";

export default function Photos() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const photoId = searchParams.get('photoId')

  const [images, setImages] = useState([] as string[]);
  const [index, setIndex] = useState(0); // currently selected photo
  const [prefix, setPrefix] = useState('');
  const [view, setView] = useState('grid');
  
  function changePhotoId(newIndex: number) {
    if (newIndex < 0 || newIndex >= images.length) return;
    setIndex(newIndex);
    router.push(`/photos?photoId=${images[newIndex]}`);
  }

  function onClose() {
    router.push("/");
  }

  useEffect(() => {
    getImages().then((images) => {
      setImages(images);
    });
  }, []);
  
  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?

  return <div>
    <HomeLayout isGalleryWidth={true}>
      <div className="flex justify-between items-center py-5">
        <h1>Engagement Photos</h1>
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

      {photoId == null && view === 'grid' &&     <GridView images={images} />}
      {photoId == null && view === 'gallery' &&  <GalleryView images={images} />}
      {photoId && <CaroselView 
        images={images} 
        index={images.indexOf(photoId)} 
        setIndex={changePhotoId} onClose={onClose}
      />}
      
    </HomeLayout>
  </div>;
}