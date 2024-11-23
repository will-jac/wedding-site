// import { useEffect, useCallback } from "react";
// import { Dialog } from "@headlessui/react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";
// import { useRef, useState } from "react";
// import type { ImageProps } from "./utils/types";
// import SharedModal from "./shared_modal";

// export default function Modal({
//   images,
//   onClose,
// }: {
//   images: ImageProps[];
//   onClose: () => void;
// }) {
//   let overlayRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const { photoId } = router.query;
//   let index = Number(photoId);

//   const [direction, setDirection] = useState(0);
//   const [curIndex, setCurIndex] = useState(index);

//   function handleClose() {
//     router.push("/", undefined, { shallow: true });
//     onClose();
//   }

//   function changePhotoId(newVal: number) {
//     if (newVal > index) {
//       setDirection(1);
//     } else {
//       setDirection(-1);
//     }
//     setCurIndex(newVal);
//     router.push(
//       {
//         query: { photoId: newVal },
//       },
//       `/p/${newVal}`,
//       { shallow: true },
//     );
//   }

//   const handleKeyDown = useCallback((event: KeyboardEvent) => {
//     if (index + 1 < images.length) {
//         changePhotoId(index + 1);
//     }
//     if (index > 0) {
//         changePhotoId(index - 1);
//     }

//   }, [changePhotoId]);
  
//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [handleKeyDown]);

//   return (
//     <Dialog
//       static
//       open={true}
//       onClose={handleClose}
//       initialFocus={overlayRef}
//       className="fixed inset-0 z-10 flex items-center justify-center"
//     >
//       {/* <DialogPanel
//         ref={overlayRef}
//         as={motion.div}
//         key="backdrop"
//         className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       /> */}
//       <SharedModal
//         index={curIndex}
//         direction={direction}
//         images={images}
//         changePhotoId={changePhotoId}
//         closeModal={handleClose}
//         navigation={true}
//       />
//     </Dialog>
//   );
// }