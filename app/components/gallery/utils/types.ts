import { User } from "../../user";

/* eslint-disable no-unused-vars */
export interface ImageProps {
  key: string;
  portrait?: boolean;
  caption?: any;
  userId?: string; // ID of the user who submitted the photo
}
  
export interface SharedModalProps {
  users?: Record<string, User>;
  index: number;
  images: ImageProps[];
  currentPhoto?: string;
  setIndex: (newIndex: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
  landscapeLoader: any;
  portraitLoader: any;
  navBarLoader: any;
}