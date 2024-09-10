import YouTube from "../../docs-v1/components/common/Youtube/Youtube";
import styles from "./HomePageBanner.module.css";
import { HomePageBannerProps } from "./HomePageBanner.interface";
import { HEADER_INFO, HEADER_TABS } from "../../constants/Homepage.constants";
import Link from "next/link";

export default function HomePageBanner({
  bannerInfo,
}: Readonly<HomePageBannerProps>) {
  return (
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <div className={styles.Content}>
          <div className="mb-8 flex flex-col items-center">
            <div className={styles.Heading}>
              Collate <span className={styles.SubHeading}>Documentation</span>
            </div>
            <p className="text-xl text-center text-[#3C4257]">
              {bannerInfo.description}
            </p>
          </div>
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.Video}>
            <YouTube videoId="oGFWjj_2gM4" className={styles.VideoContainer} />
          </div>
          <div>
            <Link href="/how-to-guides" className={styles.BannerHeading}>
              {HEADER_INFO.header}
            </Link>
            <div className={styles.DescriptionText}>
              {HEADER_INFO.description}
            </div>
            <div className={styles.TabContainer}>
              {HEADER_TABS.map(({ link, Icon, name }) => (
                <Link href={link} key={name} className={styles.Tabs}>
                  <Icon />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
