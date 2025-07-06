import Image from "next/image";
import Modal from "./modal";
import { ImageProps } from "./utils/types";
import Masonry from 'react-masonry-css';
import { useEffect, useState } from "react";
import { User } from "../user";
import { isMobile } from 'react-device-detect';

function cloudflareLoaderFactory(params: string[]) {
  return (
    { src, width, quality }: { src: string; width: number; quality?: number }
  ) =>{
    // console.log(width, quality, src);
    const new_params = params.concat([]);
    if (quality) new_params.push(`quality=${quality}`);

    const paramsString = new_params.join(",");

    // return `https://photos.hannahjackwedding.com/cdn-cgi/image/${paramsString}/${src}`;    
    return `https://photos.hannahjackwedding.com/${src}`;
  }
}

function immichLoaderFactory(size: string) {
  return (
    { src, width, quality }: { src: string; width: number; quality?: number }
  ) =>{
    return `https://photos.jackwilliams.dev/api/assets/${src}/thumbnail?size=thumbnail&key=KzVm8ZCFzOXZ2EZTQ58MII4-3q8gdMDFrMMVmdgOgUiFH4O6VbMDsk5vQa-5BpyUJ_Y`
  }
}

function weddingLoaderFactory(prefix: string = '') {
  return (
    { src }: { src: string }
  ) =>{
    if (!src || !src.includes("/"))
    {
      return `https://r2-worker.hannahjackwedding.com/${src}`;
    }
    let src_prefix = src.slice(0,src.indexOf("/"));
    if (src_prefix === "gallery")
    {
      return `https://r2-worker.hannahjackwedding.com/${src}`;
    }
    src = src.slice(src.indexOf("/")+1);

    return `https://r2-worker.hannahjackwedding.com/${src_prefix}${prefix}/${src}`;
  }
}

export const landscapeLoader = cloudflareLoaderFactory(['width=1024']);

export const weddingResizeLoader = weddingLoaderFactory('-resize');
export const weddingGridLoader = weddingLoaderFactory('-crop');
export const weddingLoader = weddingLoaderFactory();

const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function triplet(e1: number, e2: number, e3: number) {
  return keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
}
export function rgbDataURL(r: number, g: number, b: number) {
  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
}

function ImageComponent(props: { image: ImageProps, imageLoader: any, quality?: number, setPhotoId: (id: string) => void, showCaptionBelow?: boolean , users?: Record<string,User>, showOverlay?: boolean, grid?: boolean }) {
  const { image, users, grid } = props;
  const doCrop = grid ?? false;
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (users && image.userId) {
      setUser(users[image.userId]);
    }
  }, [users, image]);

  return (
    <div className="relative group"
      style={{display: "inherit", width:"100%", height:"100%"}}
    >
      <button
        onClick={(e) => {props.setPhotoId(image.key); e.preventDefault();}}
        className="after:content group block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        style={{display: "inherit", width:"100%", height:"100%"}}
      >
        <Image
          src={image.key ?? rgbDataURL(135, 155, 136)}
          // className="transform brightness-90 transition group-hover:brightness-110"
          className="transform brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)", objectFit: "cover", width: "100%", height: "100%"}}
          // width="100%"
          // height="100%"
          // fill={true}
          width={doCrop ? 720 : 720}
          height={doCrop ? 720 : 480}
          // fill={true}
          // quality={props.quality ?? 50}
          // sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
          alt={image.caption || ""}
          loader={props.imageLoader}
          placeholder="blur"
          blurDataURL={rgbDataURL(135, 155, 136)}
        />
        {/* Overlay: bottom 1/4, white on grey, with profile pic, name, caption */}
        {props.showOverlay !== false && (image.caption || user?.userName || user?.profilePicture) && (
          <div className="absolute left-0 bottom-0 w-full h-1/4 flex items-end bg-gradient-to-t from-gray-800/90 to-transparent px-3 py-2">
            <div className="flex flex-col text-white text-xs w-full truncate">
              <div className="flex items-center gap-1">
                {user?.profilePicture && (
                  <UserProfile user={user} />
                )}
                {user?.userName && <span className="font-semibold truncate max-w-[140px] sm:max-w-[200px] text-xs sm:text-sm">{user.userName}</span>}
              </div>
              <div className="flex items-center gap-1">
                {image.caption && (
                  <span className="truncate max-w-full opacity-95 text-xs sm:text-sm">{image.caption}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

export function UserProfile(props: {user: User}) {
  const {user} = props;

  return user.profilePicture 
  ? <Image
    src={user.profilePicture}
    alt={user.userName ? `${user.userName}'s profile` : 'Profile'}
    // fill={true}
    width={32}
    height={32}
    loader={weddingLoader}
    className="rounded-full border-2 border-white shadow object-cover"
    style={{width: "32px", height: "32px"}}
  /> 
  : <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
    <path d="M4 20c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5" strokeWidth="1.5" />
  </svg>

}

export function GridView(props: { images: ImageProps[], setPhotoId: (id: string) => void, users: Record<string,User> }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="grid grid-cols-3">
    {props.images.map((image, index) => (
      <div 
        key={(image.key == null || image.key == "") ? index : image.key} 
        className="m-1"
        style={{ aspectRatio: "1" }}
      >
        <ImageComponent 
          image={image} 
          imageLoader={weddingGridLoader} 
          setPhotoId={props.setPhotoId} showCaptionBelow={true} users={props.users} showOverlay={false}
          grid={true}
        />
      </div>
    ))}
  </div></div>
}

export function GalleryView(props: { images: ImageProps[], setPhotoId: (id: string) => void, users: Record<string,User> }) {
  // Define breakpoints for responsive columns
  const breakpointColumnsObj = {
    default: 4,
    1536: 3, // 2xl
    1280: 2, // xl
    640: 1   // sm and below
  };
  return <div className="mx-auto max-w-[1960px] p-4">
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-1" // -ml-1 to offset smaller gutter
      columnClassName="masonry-column px-1"
    >
      {props.images.map((image, index) => (
        <div key={(image.key == null || image.key == "") ? index : image.key} className="mb-2">
          <ImageComponent 
            image={image} 
            imageLoader={weddingResizeLoader} 
            setPhotoId={props.setPhotoId} users={props.users}
          />
        </div>
      ))}
    </Masonry>
  </div>;
}

export function CaroselView(props: {
  images: ImageProps[]; index: number; navigation: boolean,
  setIndex: (n: number) => void; onClose: () => void; onDelete: (photoKey: string) => void;
  users?: Record<string,User>; userId: string;
  site?: string
}) {
  const { images, index, navigation, setIndex, onClose, onDelete, users, userId } = props;
  const image = images[index];

  return (
    <div className="relative">
      <Modal
        images={images}
        users={users}
        userId={userId}
        index={index}
        setIndex={setIndex}
        onClose={onClose}
        onDelete={onDelete}
        portraitLoader={weddingLoader}
        landscapeLoader={weddingLoader}
        navBarLoader={weddingLoader}
        navigation={navigation}
      />
    </div>
  );
}

export function CaptionView(props: {
  images: ImageProps[]
}) {
  const [index, setIndex] = useState<number|null>(null);
  const {images} = props 

  function setPhotoId(id: string) {
    setIndex(images.findIndex((ip) => ip.key === id));
  }
  function changePhotoId(newIndex: number) {
    if (newIndex < 0 || newIndex >= images.length) return;
    setIndex(newIndex);
  }
  function onClose() {
    setIndex(null);
  }

  return <div className="mx-auto max-w-[1960px] p-4">

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {props.images.map((image, index) => (
        <div key={index}>
          <ImageComponent image={image} imageLoader={weddingLoader} setPhotoId={setPhotoId} showOverlay={false}/>
          {image.caption}
        </div>
      ))}
    </div>
    {index != null 
      ? <CaroselView 
          images={images} 
          userId={""}
          index={index} 
          setIndex={changePhotoId} onClose={onClose}
          navigation={!isMobile}
          onDelete={() => {}}
        />
      : null
    }
  </div>
}

export function GridIcon({ size = 24, color = 'currentColor', style = {} }: { size?: number, color?: string, style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', padding: '2px', ...style }}
    >
      <rect x="3" y="3" width="7" height="7" rx="2" fill={color}/>
      <rect x="14" y="3" width="7" height="7" rx="2" fill={color}/>
      <rect x="3" y="14" width="7" height="7" rx="2" fill={color}/>
      <rect x="14" y="14" width="7" height="7" rx="2" fill={color}/>
    </svg>
  );
}