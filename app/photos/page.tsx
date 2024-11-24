'use client';
import {useEffect, useState} from "react";
import Image from "next/image";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import getImages from "../components/gallery/utils/getImages";
import HomeLayout from '../components/HomeLayout';
import { GridView, GalleryView, ListView } from "../components/gallery/views";

export default function Photos() {
  const [images, setImages] = useState([] as string[]);
  const [prefix, setPrefix] = useState('');
  
  useEffect(() => {
    getImages().then((images) => {
      setImages(images);
    });
  }, []);
  
  const [view, setView] = useState('grid');

  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?

  return <div>
    <HomeLayout isGalleryWidth={true}>
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
        <ToggleButton value="list">List</ToggleButton>
      </ToggleButtonGroup>

      {view === 'grid' &&     <GridView images={images} />}
      {view === 'gallery' &&  <GalleryView images={images} />}
      {view === 'list' &&     <ListView images={images} />}
      
    </HomeLayout>
  </div>;
}