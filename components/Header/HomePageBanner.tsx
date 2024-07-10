import Link from "next/link";
import { HomePageBannerProps } from "../../docs-v1/components/common/HomePageBanner/HomePageBanner.interface";
import YouTube from "../../docs-v1/components/common/Youtube/Youtube";
import { useDocVersionContext } from "../../docs-v1/context/DocVersionContext";
import styles from "./HomePageBanner.module.css";
import { getUrlWithVersion } from "../../docs-v1/utils/CommonUtils";

export default function HomePageBanner({
  quickLinks,
  bannerInfo,
}: Readonly<HomePageBannerProps>) {
  const { docVersion } = useDocVersionContext();

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
        <div className={styles.Video}>
          <YouTube videoId="oGFWjj_2gM4" />
        </div>
      </div>
      <div className={styles.BannerNavLinkContainer}>
        {quickLinks.map(
          (
            { title, description, linkTitle, href, externalURL }
          ) => (
            <div key={href} className={styles.BannerNavLink}>
              <div className={styles.ContentContainer}>
                <div className={styles.Header}>{title}</div>
                <p className={styles.DescriptionText}>{description}</p>
              </div>
              <Link
                href={externalURL ? href : getUrlWithVersion(href, docVersion)}
                target={externalURL ? "_blank" : "_self"}
              >
                <div className={styles.Button}>{linkTitle}</div>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
