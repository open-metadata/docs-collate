import { HOME_PAGE_BANNER_INFO } from "../docs-v1/constants/homePage.constants";

export const COLLATE_HOME_PAGE_BANNER_INFO = {
  ...HOME_PAGE_BANNER_INFO,
  title: "Collate Documentation",
};

export const COLLATE_BANNER_LINKS_INFO = [
  {
    title: "Quick Start",
    description: "Install OpenMetadata to explore its full potential.",
    linkTitle: "Get Started",
    href: "/quick-start",
    icon: '/images/icons/quick-start.svg'
  },
  {
    title: "How-to Guides",
    description:
      "Get a complete overview of the features in OpenMetadata from our How-to Guides",
    linkTitle: "Explore Features",
    href: "/how-to-guides",
    icon: '/images/icons/guide.svg'
  },
];
