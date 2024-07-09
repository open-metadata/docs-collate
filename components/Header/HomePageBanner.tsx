import Image from "next/image";
import { HomePageBannerProps } from "../../docs-v1/components/common/HomePageBanner/HomePageBanner.interface";
import YouTube from "../../docs-v1/components/common/Youtube/Youtube";
import { useDocVersionContext } from "../../docs-v1/context/DocVersionContext";
import styles from "./HomePageBanner.module.css";
import Link from "next/link";
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
          <YouTube videoId="cVYP1HFXeRM" />
        </div>
      </div>
      <div className={styles.BannerNavLinkContainer}>
        {quickLinks.map(
          (
            { title, description, linkTitle, href, theme, externalURL, icon },
            index
          ) => (
            <div key={href} className={styles.BannerNavLink}>
              <Image src={icon} alt={title} width={100} height={100} />
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
