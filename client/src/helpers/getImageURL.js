import { IMAGES_BASE_URL } from "../constants/constants";

export const getImageURL = (size, path) => {
  return `${IMAGES_BASE_URL}/${size}/${path}`;
};
