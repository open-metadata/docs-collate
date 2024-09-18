import Link from "next/link";
import { HEADER_INFO, HEADER_TABS } from "../../constants/Homepage.constants";
import YouTube from "../../docs-v1/components/common/Youtube/Youtube";
import { HomePageBannerProps } from "./HomePageBanner.interface";
import styles from "./HomePageBanner.module.css";

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
            <YouTube videoId="QRcR3m9cCGo" className={styles.VideoContainer} />
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
                  <Icon height={20} />
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
