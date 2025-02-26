import classNames from "classnames";
import { useEffect, useState } from "react";
import CategoriesNav from "../docs-v1/components/CategoriesNav/CategoriesNav";
import { SelectOption } from "../docs-v1/components/SelectDropdown/SelectDropdown";
import SideNav from "../docs-v1/components/SideNav/SideNav";
import SkeletonLoader from "../docs-v1/components/common/SkeletonLoader/SkeletonLoader";
import Tile from "../docs-v1/components/common/Tiles/Tile/Tile";
import TilesContainer from "../docs-v1/components/common/Tiles/TilesContainer/TilesContainer";
import { tilesInfoArray } from "../docs-v1/constants/404Page.constants";
import { SKELETON_PARAGRAPH_WIDTHS } from "../docs-v1/constants/SkeletonLoader.constants";
import { useMenuItemsContext } from "../docs-v1/context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../docs-v1/context/NavBarCollapseContext";
import { useRouteChangingContext } from "../docs-v1/context/RouteChangingContext";
import { getVersionsList } from "../docs-v1/lib/api";
import Footer from "../components/Footer/Footer";
import TopNav from "../components/TopNav/TopNav";

function ErrorComponent() {
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const { menuItems } = useMenuItemsContext();
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(true);

  const handleSideNavCollapsed = (value: boolean) => {
    setSideNavCollapsed(value);
  };

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  return (
    <div className="flex flex-col">
      <TopNav />
      <CategoriesNav menu={menuItems} />
      <div className="flex">
        <SideNav
          sideNavCollapsed={sideNavCollapsed}
          handleSideNavCollapsed={handleSideNavCollapsed}
        />
        <div
          className={classNames(
            sideNavCollapsed ? "collapsed-content" : "non-collapsed-content"
          )}
        >
          <div className="px-12 py-6">
            {isRouteChanging ? (
              <SkeletonLoader
                paragraph={{
                  rows: SKELETON_PARAGRAPH_WIDTHS.length,
                  width: SKELETON_PARAGRAPH_WIDTHS,
                }}
              />
            ) : (
              <>
                <h2>Page not found :(</h2>
                <TilesContainer>
                  {tilesInfoArray.map((tileInfo) => (
                    <Tile
                      description={tileInfo.description}
                      key={`${tileInfo.link}${tileInfo.title}`}
                      link={tileInfo.link}
                      isExternalLink={tileInfo.isExternalLink}
                      title={tileInfo.title}
                    />
                  ))}
                </TilesContainer>
              </>
            )}
          </div>
          <Footer bordered />
        </div>
      </div>
    </div>
  );
}

export default ErrorComponent;

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
