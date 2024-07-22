import { useEffect, useState } from "react";
import { COLLATE_HOME_PAGE_BANNER_INFO } from "../constants/Homepage.constants";
import CategoriesNav from "../docs-v1/components/CategoriesNav/CategoriesNav";
import ConnectorsInfo from "../docs-v1/components/ConnectorsInfo/ConnectorsInfo";
import GoogleAnalyticsScript from "../docs-v1/components/GoogleAnalyticsScript/GoogleAnalyticsScript";
import { SelectOption } from "../docs-v1/components/SelectDropdown/SelectDropdown";
import SkeletonLoader from "../docs-v1/components/common/SkeletonLoader/SkeletonLoader";
import { OVERVIEW_INFO } from "../docs-v1/constants/homePage.constants";
import { useNavBarCollapsedContext } from "../docs-v1/context/NavBarCollapseContext";
import { useRouteChangingContext } from "../docs-v1/context/RouteChangingContext";
import { SkeletonWidth } from "../docs-v1/enums/SkeletonLoder.enum";
import { MenuItem } from "../docs-v1/interface/common.interface";
import { getVersionsList } from "../docs-v1/lib/api";
import { fetchMenuList } from "../docs-v1/utils/CommonUtils";
import HomePageBanner from "../components/Header/HomePageBanner";
import Footer from "../components/Footer/Footer";
import { getPosts } from "../externalAPIS/hashnode";
import { HASHNODE_QUERY } from "../constants/blog.constant";
import NewsEntry from "../docs-v1/components/NewsEntry/NewsEntry";
import TopNav from "../components/TopNav/TopNav";

export default function Index() {
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts(HASHNODE_QUERY);
      setBlogPosts(
        response.data.publication.posts.edges.map((edge) => edge.node)
      );
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchMenuItems = async () => {
    const res = await fetchMenuList();
    setMenu(res);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      <GoogleAnalyticsScript />
      <div className="nav-bar-container">
        <TopNav />
        <CategoriesNav menu={menu} />
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
            <HomePageBanner bannerInfo={COLLATE_HOME_PAGE_BANNER_INFO} />

            <div className="overview-container">
              <div className="overview-heading">{OVERVIEW_INFO.title}</div>
              <p className="m-0">{OVERVIEW_INFO.description}</p>
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Connectors</div>
              <ConnectorsInfo
                tabStyle="connector-tab"
                activeTabStyle="active-connector"
              />
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Blogs</div>
              <div className="blogs-container">
                {loading
                  ? Array.of("1", "2", "3").map((item) => (
                      <NewsEntry key={item} link="/">
                        <SkeletonLoader
                          className="p-4"
                          paragraph={{
                            rows: 6,
                            width: SkeletonWidth.FULL,
                          }}
                          title={SkeletonWidth.SMALL}
                        />
                      </NewsEntry>
                    ))
                  : blogPosts.map((cardInfo) => (
                      <NewsEntry
                        image={cardInfo.coverImage.url}
                        key={`${cardInfo.title}${cardInfo.link}`}
                        link={cardInfo.url}
                        title={cardInfo.title}
                        text={cardInfo.brief}
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
