import {
  OUTLINED_ICONS_BASE_URL,
  FILLED_ICONS_BASE_URL,
} from "../constants/constants";

export const getIconURL = (
  icon,
  iconType = "outlined",
  size = "24",
  color = "dc2626"
) => {
  return `${
    iconType === "outlined" ? OUTLINED_ICONS_BASE_URL : FILLED_ICONS_BASE_URL
  }/${size}/${color}/${icon}.png`;
};
