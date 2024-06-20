import {
  BANNER_LINKS_INFO,
  HOME_PAGE_BANNER_INFO,
} from "../docs-v1/constants/homePage.constants";

export const COLLATE_HOME_PAGE_BANNER_INFO = {
  ...HOME_PAGE_BANNER_INFO,
  title: "Collate Documentation",
};

export const COLLATE_BANNER_LINKS_INFO = BANNER_LINKS_INFO.filter(
  (link) => link.title !== "Join the OSS Community"
);
