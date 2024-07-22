import { HOME_PAGE_BANNER_INFO } from "../docs-v1/constants/homePage.constants";

export const COLLATE_HOME_PAGE_BANNER_INFO = {
  ...HOME_PAGE_BANNER_INFO,
  title: "Collate Documentation",
};

export const HEADER_INFO = {
  header: "How-to Guides",
  description: 'Get a complete overview of the features in OpenMetadata from our How-to Guides. The How-to Guides will give you a walk through on accomplishing the basic to the most advanced things in OpenMetadata. These step-by-step guides will help get an overview of the features and also help explore the various functionalities.'
}

export const HEADER_TABS = [
  {
    icon: '/images/header-tabs/discovery.svg',
    name: 'Discovery',
    link: '/how-to-guides/data-discovery'
  },
  {
    icon: '/images/header-tabs/lineage.svg',
    name: 'Lineage',
    link: '/how-to-guides/data-lineage'
  },
  {
    icon: '/images/header-tabs/observability.svg',
    name: 'Observability',
    link: '/quality-and-observability'
  },
  {
    icon: '/images/header-tabs/quality.svg',
    name: 'Quality',
    link: '/how-to-guides/data-quality-profiler'
  },
  {
    icon: '/images/header-tabs/collaboration.svg',
    name: 'Collaboration',
    link: '/how-to-guides/data-collaboration'
  },
  {
    icon: '/images/header-tabs/governance.svg',
    name: 'Governance',
    link: '/how-to-guides/data-governance'
  },
]
