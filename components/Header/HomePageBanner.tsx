import {
  HEADER_INFO,
  HEADER_TABS,
  HOME_PAGE_BANNER_VIDEO_ID,
} from "../../constants/Homepage.constants";
import YouTube from "../../docs-v1/components/common/Youtube/Youtube";
import { HomePageBannerProps } from "./HomePageBanner.interface";
import styles from "./HomePageBanner.module.css";
import ParamLink from "../../docs-v1/components/ParamLink";

export default function HomePageBanner({
  bannerInfo,
}: Readonly<HomePageBannerProps>) {
  return (
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <div className={styles.Content}>
          <div className="mb-8 flex flex-col items-center">
            <h1 className={styles.Heading}>
              Collate <span className={styles.SubHeading}>Documentation</span>
            </h1>
            <p className="text-xl text-center text-[#3C4257]">
              {bannerInfo.description}
            </p>
          </div>
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.Video}>
            <YouTube
              videoId={HOME_PAGE_BANNER_VIDEO_ID}
              className={styles.VideoContainer}
            />
          </div>
          <div>
            <ParamLink href="/how-to-guides" name={HEADER_INFO.header} className={styles.BannerHeading} />
            <div className={styles.DescriptionText}>
              {HEADER_INFO.description}
            </div>
            <div className={styles.TabContainer}>
              {HEADER_TABS.map(({ link, Icon, name }) => (
                <ParamLink href={link} key={name} className={styles.Tabs}>
                  <Icon height={20} />
                  <span>{name}</span>
                </ParamLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
