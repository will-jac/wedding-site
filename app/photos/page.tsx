'use client';
import { isMobile, useMobileOrientation } from 'react-device-detect';
import { useEffect, useState } from "react";
import { Suspense } from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSearchParams, useRouter } from 'next/navigation';

import getImages, { getImagesFromCloudflare, getImagesFromKV } from "../components/gallery/utils/getImages";
import HomeLayout from '../components/HomeLayout';
import { GridView, GalleryView, CaroselView } from "../components/gallery/views";

import Modal from "../components/gallery/modal";
import { ImageProps } from "../components/gallery/utils/types";

function Photos() {
  // const { isLandscape } = useMobileOrientation()
  const isLandscape = false;

  const [images, setImages] = useState(Array(20).fill({}) as ImageProps[]);
  const [index, setIndex] = useState(null as number | null); // currently selected photo
  const [view, setView] = useState(isMobile ? 'gallery' : 'grid');
  const [folder, setFolder] = useState<'engagement' | 'gallery'>('engagement');
  const searchParams = useSearchParams();

  function changePhotoId(newIndex: number) {
    if (newIndex < 0 || newIndex >= images.length) return;
    setIndex(newIndex);
  }

  function setPhotoId(id: string) {
    console.log('setting photo id', id);
    setIndex(images.findIndex((ip) => ip.key === id));
  }

  function onClose() {
    setIndex(null);
    console.log('closing');
  }

  // TODO: cache the image list in the cookies or somehow tell the network not to fetch it again
  useEffect(() => {
    getImages(folder).then((images) => {
      console.log(images);
      setImages(images);
    });
  }, [folder]);

  useEffect(() => {
    // Set view from ?tab= param if present
    const tab = searchParams.get('tab');
    if (tab === 'gallery' || tab === 'engagement') {
      setFolder(tab);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   if (images !== null && images.length > 0) {
  //       window.localStorage.setItem('ImageList', JSON.stringify(images));
  //   }
  // }, [images]);
  
  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?

  return <HomeLayout isGalleryWidth={true}>
    <div className="flex justify-between items-center py-5">
      {/* <h1>Click on a photo to open it in a higher resolution</h1> */}
      {/* <div className="flex gap-2 items-center">
        <Button
          variant={folder === 'engagement' ? 'contained' : 'outlined'}
          onClick={() => setFolder('engagement')}
        >
          Engagement
        </Button>
        <Button
          variant={folder === 'gallery' ? 'contained' : 'outlined'}
          onClick={() => setFolder('gallery')}
        >
          Gallery
        </Button>
        <ToggleButtonGroup
          color="primary"
          value={view}
          exclusive
          onChange={(_, x) => {
            if (x !== null) {
              setView(x)
            }
          }}
        >
          <ToggleButton value="grid">Grid</ToggleButton>
          <ToggleButton value="gallery">Gallery</ToggleButton>
        </ToggleButtonGroup>
      </div> */}
    </div>

    {view === 'grid' &&     <GridView images={images} setPhotoId={setPhotoId} />}
    {view === 'gallery' &&  <GalleryView images={images} setPhotoId={setPhotoId} />}
    {index != null && <CaroselView 
      images={images} 
      index={index} 
      setIndex={changePhotoId} onClose={onClose}
      navigation={!isMobile}
    />}
      
  </HomeLayout>
}

// todo: wrap this in a more inner scope
export default function Main() {
  return <Suspense fallback={<div>Loading...</div>}>
    <Photos />
  </Suspense>
}