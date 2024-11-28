import Image from "next/image";
import Link from "next/link";
import Modal from "./modal";
import { ImageProps } from "./utils/types";

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

const gridCloudflareLoader = loaderFactory(['fit=crop', 'height=720', 'width=720']);
const baseCloudflareLoader = loaderFactory(['width=720']);
const navBarCloudflareLoader = loaderFactory(['width=240']);

const portraitLoader = loaderFactory(['width=720']);
const landscapeLoader = loaderFactory(['width=1024']);

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

function ImageComponent(props: { image: ImageProps, imageLoader: any, quality?: number, setPhotoId: (id: string) => void }) {

  return <button
    // href={`/photos?photoId=${props.image}`}
    onClick={(e) => {props.setPhotoId(props.image.key); e.preventDefault();}}
    // shallow
    className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
  >
    <Image
      src={props.image.key}
      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
      style={{ transform: "translate3d(0, 0, 0)" }}
      width={720}
      height={480}
      quality={props.quality ?? 75}
      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
      alt={"An engagement photo of Jack and Hannah"}
      loader={props.imageLoader}
      placeholder="blur"
      blurDataURL={rgbDataURL(135, 155, 136)}
    />
  </button>
}

export function GridView(props: { images: ImageProps[], setPhotoId: (id: string) => void }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

    {props.images.map((image, index) => (
      <ImageComponent key={index} image={image} imageLoader={gridCloudflareLoader} setPhotoId={props.setPhotoId}/>
    ))}
  </div></div>
}

export function GalleryView(props: { images: ImageProps[], setPhotoId: (id: string) => void }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">

    {props.images.map((image, index) => (
      <ImageComponent key={index} image={image} imageLoader={baseCloudflareLoader} setPhotoId={props.setPhotoId}/>
    ))}
  </div></div>
}

export function CaroselView(props: {
  images: ImageProps[]; index: number; navigation: boolean,
  setIndex: (n: number) => void; onClose: () => void;
}) {

  return <Modal
    images={props.images}
    index={props.index}
    setIndex={props.setIndex}
    onClose={props.onClose}
    portraitLoader={portraitLoader}
    landscapeLoader={landscapeLoader}
    navBarLoader={navBarCloudflareLoader}
    navigation={props.navigation}
  />
}