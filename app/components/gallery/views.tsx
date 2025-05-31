import Image from "next/image";
import Modal from "./modal";
import { ImageProps } from "./utils/types";
import Masonry from 'react-masonry-css';
import { useEffect, useState } from "react";
import { User } from "../user";

function loaderFactory(params: string[]) {
  return (
    { src, width, quality }:
    { src: string; width: number; quality?: number }
  ) =>{
    // console.log(width, quality, src);
    const new_params = params.concat([]);
    if (quality) new_params.push(`quality=${quality}`);

    const paramsString = new_params.join(",");
    return `https://photos.hannahjackwedding.com/cdn-cgi/image/${paramsString}/${src}`;
  }
}

export const gridCloudflareLoader = loaderFactory(['fit=crop', 'height=720', 'width=720']);
export const baseCloudflareLoader = loaderFactory(['width=720']);
const navBarCloudflareLoader = loaderFactory(['width=240']);

const portraitLoader = loaderFactory(['width=720']);
export const landscapeLoader = loaderFactory(['width=1024']);

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

function ImageComponent(props: { image: ImageProps, imageLoader: any, quality?: number, setPhotoId: (id: string) => void, showCaptionBelow?: boolean , users?: Record<string,User>, showOverlay?: boolean }) {
  const { image, users } = props;
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (users && image.userId) {
      setUser(users[image.userId]);
    }
  }, [users, image]);

  return (
    <div className="relative group">
      <button
        onClick={(e) => {props.setPhotoId(image.key); e.preventDefault();}}
        className="after:content group block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        <Image
          src={image.key ?? rgbDataURL(135, 155, 136)}
          className="transform brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)" }}
          width={720}
          height={480}
          quality={props.quality ?? 50}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
          alt={image.caption || "An engagement photo of Jack and Hannah"}
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
                {user?.userName && <span className="font-semibold truncate max-w-[80px] sm:max-w-[120px] text-xs sm:text-sm">{user.userName}</span>}
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
    width={32}
    height={32}
    loader={gridCloudflareLoader}
    className="rounded-full border-2 border-white shadow object-cover"
  /> 
  : <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
    <path d="M4 20c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5" strokeWidth="1.5" />
  </svg>

}

export function GridView(props: { images: ImageProps[], setPhotoId: (id: string) => void, users: Record<string,User> }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="grid grid-cols-3">
    {props.images.map((image, index) => (
      <div key={(image.key == null || image.key == "") ? index : image.key} className="m-1">
        <ImageComponent image={image} imageLoader={gridCloudflareLoader} setPhotoId={props.setPhotoId} showCaptionBelow={true} users={props.users} showOverlay={false}/>
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
          <ImageComponent image={image} imageLoader={baseCloudflareLoader} setPhotoId={props.setPhotoId} users={props.users}/>
        </div>
      ))}
    </Masonry>
  </div>;
}

export function CaroselView(props: {
  images: ImageProps[]; index: number; navigation: boolean,
  setIndex: (n: number) => void; onClose: () => void; onDelete: (photoKey: string) => void;
  users?: Record<string,User>;
}) {
  const { images, index, navigation, setIndex, onClose, onDelete, users } = props;
  const image = images[index];

  return (
    <div className="relative">
      <Modal
        images={images}
        users={users}
        index={index}
        setIndex={setIndex}
        onClose={onClose}
        onDelete={onDelete}
        portraitLoader={portraitLoader}
        landscapeLoader={landscapeLoader}
        navBarLoader={navBarCloudflareLoader}
        navigation={navigation}
      />
    </div>
  );
}

export function CaptionView(props: {
  images: ImageProps[]
}) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

    {props.images.map((image, index) => (
      <div key={index}>
        <ImageComponent image={image} imageLoader={baseCloudflareLoader} setPhotoId={() => {}}/>
        {image.caption}
      </div>
    ))}
  </div></div>
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