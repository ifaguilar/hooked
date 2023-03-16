import {
  outlinedIconsBaseURL,
  filledIconsBaseURL,
} from "../constants/constants";

export const getIconURL = (
  icon,
  iconType = "outlined",
  size = "24",
  color = "dc2626"
) => {
  return `${
    iconType === "outlined" ? outlinedIconsBaseURL : filledIconsBaseURL
  }/${size}/${color}/${icon}.png`;
};
