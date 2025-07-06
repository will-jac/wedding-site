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
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "./utils/animationVariants";
import { range } from "./utils/range";
import type { ImageProps, SharedModalProps } from "./utils/types";
import { rgbDataURL, UserProfile } from "./views";
import downloadPhoto from "./utils/downloadPhoto";
import { canDelete } from "./utils/getImages";

function NavBar(props: any) {
  const { index, images, setPhotoId, navBarLoader, filteredImages } = props;
  return <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
    <motion.div
      initial={false}
      className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
    >
      <AnimatePresence initial={false}>
        {(filteredImages as ImageProps[])?.map((image, filteredIndex) => (
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
            onClick={() => setPhotoId(image.key)}
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
}

function Buttons(props: any) {
  const { navigation, index, images, setIndex, closeModal, currentImage, userId, onDelete } = props;
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    (async () => {
      setShowDelete(await canDelete(images[index]?.userId, userId));
    })();
  }, [userId]);

  return <div className="relative h-full w-full">
  {/* return <div className="relative aspect-[3/2] max-h-full w-full"> */}
    {navigation && (
      <>
        {index > 0 && (
          <button
            className="z-40 absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
            style={{ transform: "translate3d(0, 0, 0)" }}
            onClick={() => setIndex(index - 1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {index + 1 < (images?.length ?? 0) && (
          <button
            className="z-40 absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
            style={{ transform: "translate3d(0, 0, 0)" }}
            onClick={() => setIndex(index + 1)}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </>
    )}
    {currentImage == null ? null :  (
        <div className="z-40 absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
            <a
                href={`https://photos.hannahjackwedding.com/${images[index].key}`}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                target="_blank"
                title="Open fullsize version"
                rel="noreferrer"
            >
                <OpenInNew className="h-5 w-5" />
            </a>
            <button
                onClick={() => downloadPhoto(
                    `https://photos.hannahjackwedding.com/${images[index].key}`,
                    images[index].key
                  )
                }
                className="z-40 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                title="Download fullsize version"
            >
                <ArrowDownward  className="h-5 w-5" />
            </button>
            {showDelete && (
              <button
                onClick={() => onDelete(images[index].key)}
                className="z-40 rounded-full bg-red-600/80 p-2 text-white/90 backdrop-blur-lg transition hover:bg-red-700 hover:text-white"
                title="Delete this photo"
              >
                Delete
              </button>
            )}
        </div>
    )}

    <div className="z-40 absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
      <button
        onClick={() => closeModal()}
        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
      >
        <Close className="h-5 w-5" />
      </button>
    </div>
  </div>
}

function MainImage(props: any) {
  const { index, images, setLoaded, direction, landscapeLoader, portraitLoader, navigation, users } = props;
  const caption = images[index]?.caption;
  const userId = images[index]?.userId;
  const user = users && userId ? users[userId] : null;
  return <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
      {images[index].portrait ?? true
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
              alt={caption || "An engagement photo of Jack and Hannah"}
              loader={images[index].portrait ? portraitLoader : landscapeLoader}
              placeholder="blur"
              blurDataURL={rgbDataURL(135, 155, 136)}
              onLoad={() => setLoaded(true)}
          />
          {/* {(user?.profilePicture || user?.userName) && (
            <div className="absolute left-0 bottom-0 w-full flex items-end bg-gradient-to-t from-gray-800/90 to-transparent px-3 py-2 z-10">
              <div className="flex items-center gap-2 text-white text-base w-full truncate">
                {user?.profilePicture && (
                  <UserProfile user={user} />
                )}
                {user?.userName && <span className="font-semibold truncate max-w-[160px]">{user.userName}</span>}
              </div>
            </div>
          )} */}
          {caption || user?.profilePicture && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 py-2 bg-black bg-opacity-70 text-white text-sm text-center z-50 flex flex-col items-center">
              <div className="w-full flex items-center justify-start gap-2 mb-1">
                {user?.profilePicture && (
                  <UserProfile user={user} />
                )}
                {user?.userName && <span className="font-semibold truncate max-w-[160px]">{user.userName}</span>}
              </div>
              <div className="w-full flex justify-center">
                <span>{caption}</span>
              </div>
            </div>
          )}
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
              alt={caption || "An engagement photo of Jack and Hannah"}
              loader={images[index].portrait ? portraitLoader : landscapeLoader}
              placeholder="blur"
              blurDataURL={rgbDataURL(135, 155, 136)}
              onLoad={() => setLoaded(true)}
          />
          {(user?.profilePicture || user?.userName) && (
            <div className="absolute left-0 bottom-0 w-full flex items-end bg-gradient-to-t from-gray-800/90 to-transparent px-3 py-2 z-10">
              <div className="flex items-center gap-2 text-white text-base w-full truncate">
                {user?.profilePicture && (
                  <UserProfile user={user} />
                )}
                {user?.userName && <span className="font-semibold truncate max-w-[160px]">{user.userName}</span>}
              </div>
            </div>
          )}
          {caption && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full px-4 py-2 bg-black bg-opacity-70 text-white text-sm text-center z-50 flex flex-col items-center">
              <div className="w-full flex items-center justify-start gap-2 mb-1">
                {user?.profilePicture && (
                  <UserProfile user={user} />
                )}
                {user?.userName && <span className="font-semibold truncate max-w-[160px]">{user.userName}</span>}
              </div>
              <div className="w-full flex justify-center">
                <span>{caption}</span>
              </div>
            </div>
          )}
        </div>
      }
  </div>
}

export default function SharedModal(props: SharedModalProps & { userId: string, onDelete?: (key: string) => void }) {
  const { 
      index,
      images,
      setIndex,
      closeModal,
      navigation,
      currentPhoto,
      direction,
      landscapeLoader,
      portraitLoader,
      navBarLoader,
      onDelete,
  } = props;

  const [loaded, setLoaded] = useState(false);
  
  // inneficient code that is equivalent to 
  // images[index-1:index+15]
  let filteredImages = images?.filter((_, i) => range(index - 15, index + 15).includes(i));

  function setPhotoId(id: string) {
    setIndex(images.findIndex((ip) => ip.key === id));
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < (images?.length ?? 0) - 1) {
        setIndex(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        setIndex(index - 1);
      }
    },
    trackMouse: true,
  });
  let aspectRatio = images[index]?.portrait ? "2/3" : "3/2";

  let currentImage = images ? images[index] : currentPhoto;
  let isPortrait = images[index]?.portrait;

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className={`relative z-50 flex w-full h-full items-center`}
        {...handlers}
      >
        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && <Buttons {...props} 
            currentImage={currentImage} navigation={navigation} userId={props.userId} 
            onDelete={props.onDelete} 
          />} 
          {/* {navigation && <NavBar {...props} filteredImages={filteredImages} setPhotoId={setPhotoId}/>}  */}
        </div>
        <MainImage {...props} setLoaded={setLoaded} users={props.users} />
      </div>
    </MotionConfig>
  );
}