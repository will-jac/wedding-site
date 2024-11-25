/* eslint-disable no-unused-vars */
export interface ImageProps {
    key: string;
    height: number;
    width: number;
    portrait: boolean;
    // public_id: string;
    // format: string;
    // blurDataUrl: string;
  }
  
  export interface SharedModalProps {
    index: number;
    images: ImageProps[];
    currentPhoto?: string;
    changePhotoId: (newVal: number) => void;
    closeModal: () => void;
    navigation: boolean;
    direction?: number;
    landscapeLoader: any;
    portraitLoader: any;
    navBarLoader: any;
  }