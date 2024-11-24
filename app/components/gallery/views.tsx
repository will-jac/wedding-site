import Image from "next/image";

function loaderFactory(params: string[]) {
  return (
    { src, width, quality }: 
    { src: string; width: number; quality?: number }
  ) =>{
    console.log(width, quality, src);
    const new_params = params.concat([]);
    if (quality) new_params.push(`quality=${quality}`);
    
    const paramsString = new_params.join(",");
    return `https://photos.hannahjackwedding.com/cdn-cgi/image/${paramsString}/${src}`;
  }
}

const gridCloudflareLoader = loaderFactory(['fit=crop', 'height=720', 'width=720']);
const baseCloudflareLoader = loaderFactory(['width=720']);


function ImageComponent(props: { image: string, imageLoader: any}) {

  return <Image 
    src={props.image} 
    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
    style={{ transform: "translate3d(0, 0, 0)" }}
    width={720} 
    height={480}
    quality={50}
    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
    alt={"An engagement photo of Jack and Hannah"}
    loader={props.imageLoader}
  />
}

export function GridView(props: { images: string[] }) {
    return <div className="mx-auto max-w-[1960px] p-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

      {props.images.map((image, index) => (
        <ImageComponent key={index} image={image} imageLoader={gridCloudflareLoader} />
      ))}
    </div>
  </div>
}

export function GalleryView(props: { images: string[] }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">

    {props.images.map((image, index) => (
      <ImageComponent key={index} image={image} imageLoader={baseCloudflareLoader} />
    ))}
  </div>
</div>
}

export function ListView(props: { images: string[] }) {
  return <div className="mx-auto max-w-[1960px] p-4">
  <div className="columns-1 gap-4">

    {props.images.map((image, index) => (
      <ImageComponent key={index} image={image} imageLoader={baseCloudflareLoader} />
    ))}
  </div>
</div>
}