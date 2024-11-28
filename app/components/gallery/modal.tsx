import { useEffect, useCallback } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import SharedModal from "./shared_modal";
import { ImageProps } from "./utils/types";

export default function Modal(props: {
  images: ImageProps[]; index: number; setIndex: (n: number) => void, onClose: () => void;
  portraitLoader: any, landscapeLoader: any; navBarLoader: any;
}) {
  const {
    images, index, setIndex, onClose, portraitLoader, landscapeLoader, navBarLoader
  } = props;

  let overlayRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setIndex(index + 1);
      setDirection(1);
    }
    if (event.key === "ArrowLeft") {
      setIndex(index - 1);
      setDirection(-1);
    }
  }, [index, setIndex]);
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Dialog
      static
      open={true}
      onClose={onClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <DialogPanel
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SharedModal
          index={index}
          direction={direction}
          images={images}
          setIndex={setIndex}
          closeModal={onClose}
          navigation={true}
          portraitLoader={portraitLoader}
          landscapeLoader={landscapeLoader}
          navBarLoader={navBarLoader}
        />
      </DialogPanel>
    </Dialog>
  );
}