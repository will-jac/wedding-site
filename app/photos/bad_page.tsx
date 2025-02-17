// import { useState } from "react";

// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useRef } from "react";
// import Modal from "../components/gallery/modal";
// // import getBase64ImageUrl from "../components/gallery/utils/generateBlurPlaceholder";
// import type { ImageProps } from "../components/gallery/utils/types";
// import getImages from "../components/gallery/utils/getImages";
// import { useLastViewedPhoto } from "../components/gallery/utils/useLastViewedPhoto";

// export default function Gallery() {
//     const router = useRouter();
//     const { photoId } = router.query;
//     const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
//     const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

//     // TODO: cache this in vercel edge cache
//     const [images, setImages] = useState([] as ImageProps[]);

//     // run this once on page load
//     useEffect(() => {
//         getImages().then((images) => {
//             setImages(images);
//         });
//     }, []);

//     useEffect(() => {
//         // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
//         if (lastViewedPhoto && !photoId) {
//         lastViewedPhotoRef?.current?.scrollIntoView({ block: "center" });
//         setLastViewedPhoto("");
//         }
//     }, [photoId, lastViewedPhoto, setLastViewedPhoto]);



//     return (
//         <>
//         <Head>
//             <title>Next.js Conf 2022 Photos</title>
//             <meta
//             property="og:image"
//             content="https://nextjsconf-pics.vercel.app/og-image.png"
//             />
//             <meta
//             name="twitter:image"
//             content="https://nextjsconf-pics.vercel.app/og-image.png"
//             />
//         </Head>
//         <main className="mx-auto max-w-[1960px] p-4">
//             {photoId && (
//             <Modal
//                 images={images}
//                 onClose={() => {
//                 setLastViewedPhoto(photoId as string);
//                 }}
//             />
//             )}
//             <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
//                 {/* {images.map(({ id, public_id, format, blurDataUrl }) => (
//                 <Link
//                 key={id}
//                 href={`/?photoId=${id}`}
//                 as={`/p/${id}`}
//                 ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
//                 shallow
//                 className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
//                 >
//                 <Image
//                     alt="Next.js Conf photo"
//                     className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
//                     style={{ transform: "translate3d(0, 0, 0)" }}
//                     placeholder="blur"
//                     blurDataURL={blurDataUrl}
//                     src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
//                     width={720}
//                     height={480}
//                     sizes="(max-width: 640px) 100vw,
//                     (max-width: 1280px) 50vw,
//                     (max-width: 1536px) 33vw,
//                     25vw"
//                 />
//                 </Link>
//             ))} */}
//             </div>
//         </main>
//         <footer className="p-6 text-center text-white/80 sm:p-12">
//             Thank you to{" "}
//             <a
//             href="https://edelsonphotography.com/"
//             target="_blank"
//             className="font-semibold hover:text-white"
//             rel="noreferrer"
//             >
//             Josh Edelson
//             </a>
//             ,{" "}
//             <a
//             href="https://www.newrevmedia.com/"
//             target="_blank"
//             className="font-semibold hover:text-white"
//             rel="noreferrer"
//             >
//             Jenny Morgan
//             </a>
//             , and{" "}
//             <a
//             href="https://www.garysextonphotography.com/"
//             target="_blank"
//             className="font-semibold hover:text-white"
//             rel="noreferrer"
//             >
//             Gary Sexton
//             </a>{" "}
//             for the pictures.
//         </footer>
//         </>
//     );
// };

// export async function getStaticProps() {
// //   const results = await cloudinary.v2.search
// //     .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
// //     .sort_by("public_id", "desc")
// //     .max_results(400)
// //     .execute();

  
// //   let reducedResults: ImageProps[] = [];

// //   let i = 0;
// //   for (let result of results.resources) {
// //     reducedResults.push({
// //       id: i,
// //       height: result.height,
// //       width: result.width,
// //       public_id: result.public_id,
// //       format: result.format,
// //     });
// //     i++;
// //   }

// //   const blurImagePromises = results.resources.map((image: ImageProps) => {
// //     return getBase64ImageUrl(image);
// //   });
// //   const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

// //   for (let i = 0; i < reducedResults.length; i++) {
// //     reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
// //   }

// //   return {
// //     props: {
// //       images: reducedResults,
// //     },
// //   };
// }