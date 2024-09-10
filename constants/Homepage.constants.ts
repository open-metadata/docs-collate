import { HOME_PAGE_BANNER_INFO } from "../docs-v1/constants/homePage.constants";
import { ReactComponent as DiscoveryIcon } from "../images/header-tabs/discovery.svg";
import { ReactComponent as LineageIcon } from "../images/header-tabs/lineage.svg";
import { ReactComponent as ObservabilityIcon } from "../images/header-tabs/observability.svg";
import { ReactComponent as QualityIcon } from "../images/header-tabs/quality.svg";
import { ReactComponent as CollaborationIcon } from "../images/header-tabs/collaboration.svg";
import { ReactComponent as GovernanceIcon } from "../images/header-tabs/governance.svg";

export const COLLATE_HOME_PAGE_BANNER_INFO = {
  ...HOME_PAGE_BANNER_INFO,
  title: "Collate Documentation",
};

export const HEADER_INFO = {
  header: "How-to Guides",
  description:
    "Get a complete overview of the features in OpenMetadata from our How-to Guides. The How-to Guides will give you a walk through on accomplishing the basic to the most advanced things in OpenMetadata. These step-by-step guides will help get an overview of the features and also help explore the various functionalities.",
};

export const HEADER_TABS = [
  {
    Icon: DiscoveryIcon,
    name: "Discovery",
    link: "/how-to-guides/data-discovery",
  },
  {
    Icon: LineageIcon,
    name: "Lineage",
    link: "/how-to-guides/data-lineage",
  },
  {
    Icon: ObservabilityIcon,
    name: "Observability",
    link: "/quality-and-observability",
  },
  {
    Icon: QualityIcon,
    name: "Quality",
    link: "/how-to-guides/data-quality-profiler",
  },
  {
    Icon: CollaborationIcon,
    name: "Collaboration",
    link: "/how-to-guides/data-collaboration",
  },
  {
    Icon: GovernanceIcon,
    name: "Governance",
    link: "/how-to-guides/data-governance",
  },
];
