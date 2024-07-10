import { useEffect } from "react";
import {
  COLLATE_BANNER_LINKS_INFO,
  COLLATE_HOME_PAGE_BANNER_INFO,
} from "../../constants/Homepage.constants";
import CategoriesNav from "../../docs-v1/components/CategoriesNav/CategoriesNav";
import ConnectorsInfo from "../../docs-v1/components/ConnectorsInfo/ConnectorsInfo";
import GoogleAnalyticsScript from "../../docs-v1/components/GoogleAnalyticsScript/GoogleAnalyticsScript";
import NewsEntry from "../../docs-v1/components/NewsEntry/NewsEntry";
import { SelectOption } from "../../docs-v1/components/SelectDropdown/SelectDropdown";
import TopNav from "../../docs-v1/components/TopNav/TopNav";
import SkeletonLoader from "../../docs-v1/components/common/SkeletonLoader/SkeletonLoader";
import {
  BLOGS_INFO,
  OVERVIEW_INFO,
} from "../../docs-v1/constants/homePage.constants";
import { useMenuItemsContext } from "../../docs-v1/context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../../docs-v1/context/NavBarCollapseContext";
import { useRouteChangingContext } from "../../docs-v1/context/RouteChangingContext";
import { SkeletonWidth } from "../../docs-v1/enums/SkeletonLoder.enum";
import { getVersionsList } from "../../docs-v1/lib/api";
import { ReactComponent as CollateIcon } from "../../images/icons/collate-logo.svg";
import HomePageBanner from "../../components/Header/HomePageBanner";
import Footer from "../../components/Footer/Footer";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

export default function Index({ versionsList }: Readonly<Props>) {
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const { menuItems } = useMenuItemsContext();

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  return (
    <>
      <GoogleAnalyticsScript />
      <div className="nav-bar-container">
        <TopNav
          logo={<CollateIcon width={128} height={50} />}
          versionsList={versionsList}
        />
        <CategoriesNav menu={menuItems} />
      </div>
      <div className="home-page">
        {isRouteChanging ? (
          <div className="pt-20 px-32">
            <SkeletonLoader
              paragraph={{
                rows: 16,
                width: SkeletonWidth.FULL,
              }}
              title={SkeletonWidth.SMALL}
            />
          </div>
        ) : (
          <>
            <HomePageBanner
              bannerInfo={COLLATE_HOME_PAGE_BANNER_INFO}
              quickLinks={COLLATE_BANNER_LINKS_INFO}
            />

            <div className="overview-container">
              <div className="overview-heading">{OVERVIEW_INFO.title}</div>
              <p className="m-0">{OVERVIEW_INFO.description}</p>
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Connectors</div>
              <ConnectorsInfo tabStyle="connector-tab" activeTabStyle="active-connector" />
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Blogs</div>
              <div className="blogs-container">
                {BLOGS_INFO.map((cardInfo) => (
                  <NewsEntry
                    image={cardInfo.image}
                    key={`${cardInfo.title}${cardInfo.link}`}
                    link={cardInfo.link}
                    title={cardInfo.title}
                    text={cardInfo.text}
                  />
                ))}
              </div>
            </div>
            <div className="mt-20" />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Check if the version field passed in context params is proper version format
    const versionsList: Array<SelectOption<string>> = getVersionsList();

    return {
      props: { versionsList },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
