import Image from "next/image";
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

function ImageComponent(props: { image: ImageProps, imageLoader: any, quality?: number, setPhotoId: (id: string) => void, showCaptionBelow?: boolean }) {
  return (
    <div className={props.showCaptionBelow ? "flex flex-col items-center" : "relative group"}>
      <button
        onClick={(e) => {props.setPhotoId(props.image.key); e.preventDefault();}}
        className="after:content group block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        <Image
          src={props.image.key ?? rgbDataURL(135, 155, 136)}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)" }}
          width={720}
          height={480}
          quality={props.quality ?? 50}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
          alt={props.image.caption || "An engagement photo of Jack and Hannah"}
          loader={props.imageLoader}
          placeholder="blur"
          blurDataURL={rgbDataURL(135, 155, 136)}
        />
        {/* Gallery view: show caption on hover */}
        {!props.showCaptionBelow && props.image.caption && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 max-w-[90%] truncate whitespace-pre-line text-center">
            {props.image.caption}
          </div>
        )}
      </button>
      {/* Grid view: show caption below image */}
      {props.showCaptionBelow && props.image.caption && (
        <div className="mt-1 text-xs text-center text-gray-700 max-w-[90%] truncate whitespace-pre-line">
          {props.image.caption}
        </div>
      )}
    </div>
  );
}

export function GridView(props: { images: ImageProps[], setPhotoId: (id: string) => void }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {props.images.map((image, index) => (
      <ImageComponent key={index} image={image} imageLoader={gridCloudflareLoader} setPhotoId={props.setPhotoId} showCaptionBelow={true}/>
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

export function CaptionView(props: {
  images: ImageProps[]
}) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

    {props.images.map((image, index) => (
      <div key={index}>
        <ImageComponent  image={image} imageLoader={baseCloudflareLoader} setPhotoId={() => {}}/>
        {image.caption}
      </div>
    ))}
  </div></div>
}