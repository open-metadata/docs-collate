export interface HomePageBannerProps {
  bannerInfo: BannerInfo;
}

export interface QuickLinksInfo {
  title: string;
  description: string;
  linkTitle: string;
  href: string;
  externalURL?: boolean;
}

export interface BannerInfo {
  title: string;
  description: string;
}
