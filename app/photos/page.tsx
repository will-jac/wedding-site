'use client';
import { isMobile, useMobileOrientation } from 'react-device-detect';
import { useEffect, useState } from "react";
import { Suspense } from 'react'
import { Button, ToggleButton, ToggleButtonGroup, Select, MenuItem } from "@mui/material";
import { useSearchParams, useRouter } from 'next/navigation';

import getImages, { getImagesFromCloudflare, getImagesFromKV, getUsers, deleteImage } from "../components/gallery/utils/getImages";
import HomeLayout from '../components/HomeLayout';
import { GridView, GalleryView, CaroselView, GridIcon, UserProfile } from "../components/gallery/views";

import { ImageProps } from "../components/gallery/utils/types";
import UploadForm from '../components/UploadForm';
import CreateAccount from '../components/CreateAccount';
import { getUser, User } from '../components/user';

function Photos() {

  const [images, setImages] = useState(Array(20).fill({}) as ImageProps[]);
  const [index, setIndex] = useState(null as number | null); // currently selected photo
  const [view, setView] = useState<'gallery' | 'grid'>('gallery');
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

  useEffect(() => {
    console.log("getting images " + folder);
    let isMounted = true;
    const fetchImages = () => {
      getImages(folder).then((images) => {
        if (isMounted) setImages(images);
      });
    };
    fetchImages();

    const interval = setInterval(fetchImages, 30000); // fetch every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [folder]);

  useEffect(() => {
    // Set view from ?tab= param if present
    const tab = searchParams.get('tab');
    const v = searchParams.get('view');
    if (tab === 'wedding' || tab === 'engagement') {
      setFolder(tab);
    }
    if (v === 'grid' || v === 'gallery') {
      setView(v);
    }
  }, [searchParams]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('HannahJackWeddingUser') : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
        setShowWeddingPhotos(true);
      } catch {
        console.log("failed to fetch user");
      }
    } else {
      console.log("failed to fetch user");
    }

    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();

    const fetchUser = async () => {
      if (user.userId != null && user.userKey != null) {
        const u = await getUser(user.userId, user.userKey);
        if (u) {
          setUser(u);
          localStorage.setItem('HannahJackWeddingUser', JSON.stringify(u));
        }
      }
    };
    fetchUser();
    
  }, []);

  // Prevent background scroll when upload modal is open
  useEffect(() => {
    if (showUpload && showWeddingPhotos) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showUpload, showWeddingPhotos]);

  // useEffect(() => {
  //   if (images !== null && images.length > 0) {
  //       window.localStorage.setItem('ImageList', JSON.stringify(images));
  //   }
  // }, [images]);
  
  // TODO: show a selected photo in a modal with more resolution
  // TODO: let people like photos and have that affect the sorting?

  async function handleDeletePhoto(photoKey: string) {
    if (!user?.userId || !user?.userKey) return;
    if (!window.confirm('Are you sure you want to delete this photo? This cannot be undone.')) return;
    try {
      const isDeleted = await deleteImage(photoKey, user.userId ?? "", user.userKey ?? "");
      if (isDeleted) {
        setIndex(null);
        getImages(folder).then(setImages);
      } else {
        alert('Failed to delete photo.');
      }
    } catch (e) {
      alert('Error deleting photo.');
      console.log(e);
    }
  }

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
          <CreateAccount user={user} setUser={setUser} onSuccess={() => setShowAccount(false)} />
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
          onClick={() => {
            setView('grid');
            router.replace(`?tab=${folder}&view=grid`, { scroll: false });
          }}
          sx={{ minWidth: 24, padding: 0.5, textTransform: 'none' }}
        >
          <GridIcon />
        </Button>
        <Button
          variant={view === 'gallery' ? 'contained' : 'outlined'}
          onClick={() => {
            setView('gallery');
            router.replace(`?tab=${folder}&view=gallery`, { scroll: false });
          }}
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
          className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
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
      userId={user?.userId ?? ""}
      index={index} 
      setIndex={changePhotoId} onClose={onClose}
      navigation={!isMobile}
      onDelete={(key) => handleDeletePhoto(key)}
    />}
      
  </HomeLayout>
}

// todo: wrap this in a more inner scope
export default function Main() {
  return <Suspense fallback={<div>Loading...</div>}>
    <Photos />
  </Suspense>
}