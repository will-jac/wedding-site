import {
  ArrowDownward ,
  OpenInNew,
  UTurnLeft,
  ChevronLeft,
  ChevronRight,
  Close,
} from "@mui/icons-material";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "./utils/animationVariants";
import { range } from "./utils/range";
import type { ImageProps, SharedModalProps } from "./utils/types";
import { rgbDataURL } from "./views";
import downloadPhoto from "./utils/downloadPhoto";

function Buttons(props: any) {
  const { navigation, index, images, changePhotoId, closeModal, currentImage } = props;
  
  return <div className="relative aspect-[3/2] max-h-full w-full">
    {navigation && (
      <>
        {index > 0 && (
          <button
            className="z-40 absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
            style={{ transform: "translate3d(0, 0, 0)" }}
            onClick={() => changePhotoId(index - 1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {index + 1 < (images?.length ?? 0) && (
          <button
            className="z-40 absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
            style={{ transform: "translate3d(0, 0, 0)" }}
            onClick={() => changePhotoId(index + 1)}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </>
    )}
    {currentImage == null ? null :  (
        <div className="z-40 absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
            <a
                href={`https://photos.hannahjackwedding.com/cdn-cgi/image//${images[index]}`}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                target="_blank"
                title="Open fullsize version"
                rel="noreferrer"
            >
                <OpenInNew className="h-5 w-5" />
            </a>
        <button
            onClick={() => downloadPhoto(
                `https://r2-worker.jackawilliams13.workers.dev/?key=${images[index]}`,
                images[index]
              )
            }
            className="z-40 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
            title="Download fullsize version"
        >
            <ArrowDownward  className="h-5 w-5" />
        </button>
        </div>
    )}

    <div className="z-40 absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
      <button
        onClick={() => closeModal()}
        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
      >
        {navigation ? (
          <Close className="h-5 w-5" />
        ) : (
          <UTurnLeft className="h-5 w-5" />
        )}
      </button>
    </div>
  </div>
}

function AnimatedImage(props: any) {
  const { index, images, setLoaded, direction, imageLoader, navigation } = props;

  return  <div className="w-full overflow-hidden">
    <div className="relative flex aspect-[3/2] items-center justify-center">
      <div className="absolute">
      {/* <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute"
        > */}
          <Image 
              src={images[index]} 
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              width={navigation ? 1280 : 1920}
              height={navigation ? 853 : 1280}
              quality={100}
              priority
              // sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
              alt={"An engagement photo of Jack and Hannah"}
              loader={imageLoader}
              placeholder="blur"
              blurDataURL={rgbDataURL(135, 155, 136)}
              onLoad={() => setLoaded(true)}
          /> 
        {/* </motion.div>
      </AnimatePresence> */}
      </div>
      
    </div>
  </div>
}

function MainImage(props: any) {
  const { index, images, setLoaded, direction, landscapeLoader, portraitLoader, navigation } = props;

  return <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
      {images[index].portrait 
        ? <div className="absolute flex items-center h-full object-contain">
          <Image 
              src={images[index].key} 
              className="h-full object-contain transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              width={images[index].portrait ? 1280 : 1920}
              height={images[index].portrait ? 853 : 1280}
              quality={100}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
              alt={"An engagement photo of Jack and Hannah"}
              loader={images[index].portrait ? portraitLoader : landscapeLoader}
              placeholder="blur"
              blurDataURL={rgbDataURL(135, 155, 136)}
              onLoad={() => setLoaded(true)}
          /> 
          </div>
        : <div className="absolute flex items-center w-full">
          <Image 
              src={images[index].key} 
              className="w-full object-contain transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              width={images[index].portrait ? 1280 : 1920}
              height={images[index].portrait ? 853 : 1280}
              quality={100}
              priority
              // sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
              alt={"An engagement photo of Jack and Hannah"}
              loader={images[index].portrait ? portraitLoader : landscapeLoader}
              placeholder="blur"
              blurDataURL={rgbDataURL(135, 155, 136)}
              onLoad={() => setLoaded(true)}
          /> 
        </div>
      }
  </div>
}

export default function SharedModal(props: SharedModalProps) {
  const { 
      index,
      images,
      changePhotoId,
      closeModal,
      navigation,
      currentPhoto,
      direction,
      landscapeLoader,
      portraitLoader,
      navBarLoader,
  } = props;

  const [loaded, setLoaded] = useState(false);
  
  // inneficient code that is equivalent to 
  // images[index-1:index+15]
  let filteredImages = images?.filter((_, i) => range(index - 15, index + 15).includes(i));

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < (images?.length ?? 0) - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images ? images[index] : currentPhoto;

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && <Buttons {...props} currentImage={currentImage} />}
          {/* Bottom Nav bar */}
          {navigation && (
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
              <motion.div
                initial={false}
                className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
              >
                <AnimatePresence initial={false}>
                  {filteredImages?.map((image, filteredIndex) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                      //   scale: id === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => changePhotoId(index + filteredIndex - 1)}
                      key={image.key}
                      className={`${image.key == images[index].key
                        ? "z-20 rounded-md shadow shadow-black/50"
                        : "z-10"
                      } ${
                        // at the start of the array
                        image.key === images[0].key ? "rounded-l-md" : ""
                      } ${
                        // at the end of the array
                        image.key === images[images.length - 1].key ? "rounded-r-md" : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <Image
                        alt="small photos on the bottom"
                        width={180}
                        height={120}
                        className={`${
                          image === images[index]
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={image.key}
                        loader={navBarLoader}
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
        <MainImage {...props} setLoaded={setLoaded} />
      </div>
    </MotionConfig>
  );
}