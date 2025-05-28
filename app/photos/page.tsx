'use client';
import { isMobile, useMobileOrientation } from 'react-device-detect';
import { useEffect, useState } from "react";
import { Suspense } from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Select, MenuItem } from "@mui/material";
import { useSearchParams, useRouter } from 'next/navigation';

import getImages, { getImagesFromCloudflare, getImagesFromKV, getUsers } from "../components/gallery/utils/getImages";
import HomeLayout from '../components/HomeLayout';
import { GridView, GalleryView, CaroselView, GridIcon, UserProfile } from "../components/gallery/views";

import { ImageProps } from "../components/gallery/utils/types";
import UploadForm from '../components/UploadForm';
import CreateAccount from '../components/CreateAccount';
import { User } from '../components/user';

function Photos() {
  // const { isLandscape } = useMobileOrientation()
  const isLandscape = false;

  const [images, setImages] = useState(Array(20).fill({}) as ImageProps[]);
  const [index, setIndex] = useState(null as number | null); // currently selected photo
  const [view, setView] = useState(isMobile ? 'gallery' : 'grid');
  const [folder, setFolder] = useState<'engagement' | 'wedding'>('engagement');
  const [showUpload, setShowUpload] = useState(false);
  const [showAccount, setShowAccount] = useState(false); // NEW: modal for account
  const [user, setUser] = useState<User>({userName: "", email: ""});
  const [users, setUsers] = useState<Record<string, User>>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showWeddingPhotos, setShowWeddingPhotos] = useState(false);

  function changePhotoId(newIndex: number) {
    if (newIndex < 0 || newIndex >= images.length) return;
    setIndex(newIndex);
  }

  function setPhotoId(id: string) {
    setIndex(images.findIndex((ip) => ip.key === id));
  }

  function onClose() {
    setIndex(null);
  }

  // TODO: cache the image list in the cookies or somehow tell the network not to fetch it again
  useEffect(() => {
    console.log("getting images " + folder);
    getImages(folder).then((images) => {
      console.log(images);
      setImages(images);
    });
  }, [folder]);

  useEffect(() => {
    // Set view from ?tab= param if present
    const tab = searchParams.get('tab');
    if (tab === 'wedding' || tab === 'engagement') {
      setFolder(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('HannahJackWeddingUser') : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
        console.log("set user");
        setShowWeddingPhotos(true);
      } catch {
        console.log("failed to fetch user");
      }
    } else {
      console.log("failed to fetch user");
    }

    const fetchUser = async () => {
      const users = await getUsers();
      console.log("users:");
      console.log(users);
      setUsers(users);
    };
    fetchUser();
    
  }, []);

  // useEffect(() => {
  //   if (images !== null && images.length > 0) {
  //       window.localStorage.setItem('ImageList', JSON.stringify(images));
  //   }
  // }, [images]);
  
  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?

  return <HomeLayout isGalleryWidth={true}>
    {/* User icon at top right */}
    <div className="flex justify-end items-center px-5 pt-2">
      
    </div>
    {/* Account modal */}
    {showAccount && showWeddingPhotos && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        onClick={() => setShowAccount(false)}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowAccount(false)}
            aria-label="Close account modal"
          >
            &times;
          </button>
          <CreateAccount user={user} setUser={setUser} onSuccess={() => setShowAccount(false)} isEditing={true} />
        </div>
      </div>
    )}
    <div className="flex justify-between items-center px-5">
      {showWeddingPhotos && (
        <div className="flex gap-1 items-center">
          <Select
            value={folder}
            onChange={(e) => {
              const value = e.target.value as 'engagement' | 'wedding';
              setFolder(value);
              router.replace(`?tab=${value}`, { scroll: false });
            }}
            size="small"
            sx={{ minWidth: 90, fontSize: 14, height: 32, '.MuiSelect-select': { padding: '4px 24px 4px 8px' } }}
          >
            <MenuItem value="engagement" sx={{ fontSize: 14, minHeight: 32 }}>Engagement</MenuItem>
            <MenuItem value="wedding" sx={{ fontSize: 14, minHeight: 32 }}>Wedding</MenuItem>
          </Select>
          {folder === 'wedding' 
            ? <>
              <Button
                variant={showUpload ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setShowUpload(v => !v)}
                sx={{ minWidth: 0, padding: 0.5, textTransform: 'none' }}
              >
                <span role="img" aria-label="upload">
                  <span className="block sm:hidden">+ Add</span>
                  <span className="hidden sm:block">+ Add Your Photos!</span>
                </span>
              </Button>
              <button
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 border border-gray-300"
                onClick={() => setShowAccount(true)}
                aria-label="Open user profile"
              >
                <UserProfile user={user} />
              </button>
            </>
            : null
          }
        </div>
      )}
      <div className="flex gap-1 items-center ml-auto">
        <Button
          variant={view === 'grid' ? 'contained' : 'outlined'}
          onClick={() => setView('grid')}
          sx={{ minWidth: 24, padding: 0.5, textTransform: 'none' }}
        >
          <GridIcon />
          {/* <span role="img" aria-label="grid">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-grid" viewBox="0 0 18 18">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
            </svg>
          </span> */}
        </Button>
        <Button
          variant={view === 'gallery' ? 'contained' : 'outlined'}
          onClick={() => setView('gallery')}
          sx={{ minWidth: 24, padding: 1, textTransform: 'none' }}
        >
          <span role="img" aria-label="gallery">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </span>
        </Button>
      </div>
    </div>
    {showUpload && showWeddingPhotos && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        onClick={() => setShowUpload(false)}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowUpload(false)}
            aria-label="Close upload modal"
          >
            &times;
          </button>
          <UploadForm onUpload={() => {
            setShowUpload(false);
            getImages(folder).then((images) => {
              setImages(images);
            });
          }} />
        </div>
      </div>
    )}

    {view === 'grid' &&     <GridView images={images} setPhotoId={setPhotoId} users={users} />}
    {view === 'gallery' &&  <GalleryView images={images} setPhotoId={setPhotoId} users={users} />}
    {index != null && <CaroselView 
      images={images} 
      users={users}
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