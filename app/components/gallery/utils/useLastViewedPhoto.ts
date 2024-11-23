import { createGlobalState } from "react-hooks-global-state";

const initialState = { photoToScrollTo: "" };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("photoToScrollTo");
};