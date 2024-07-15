import Link from "next/link";
import YouTube from "../../docs-v1/components/common/Youtube/Youtube";
import styles from "./HomePageBanner.module.css";
import { HomePageBannerProps } from "./HomePageBanner.interface";
import { HEADER_TABS } from "../../constants/Homepage.constants";

export default function HomePageBanner({
  quickLinks,
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
            <div className={styles.BannerHeading}>How-to Guides</div>
            <div className={styles.DescriptionText}>
              Get a complete overview of the features in OpenMetadata from our
              How-to Guides. The How-to Guides will give you a walk through on
              accomplishing the basic to the most advanced things in
              OpenMetadata. These step-by-step guides will help get an overview
              of the features and also help explore the various functionalities.
            </div>
            <div className={styles.TabContainer}>
              {HEADER_TABS.map(item => (
                <div key={item.name} className={styles.Tabs}>
                  <img src={item.icon} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
