import algoliasearch from "algoliasearch/lite";
import classNames from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { InstantSearch } from "react-instantsearch";
import { useDocVersionContext } from "../../docs-v1/context/DocVersionContext";
import { useNavBarCollapsedContext } from "../../docs-v1/context/NavBarCollapseContext";
import { SearchContextProvider } from "../../docs-v1/context/SearchContext";
import { ReactComponent as ApiIcon } from "../../docs-v1/images/icons/api.svg";
import { ReactComponent as CollateIcon } from "../../images/icons/collate-logo.svg";
import Search from "../../docs-v1/components/Search/Search";
import styles from "../../docs-v1/components/TopNav/TopNav.module.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export default function TopNav() {
  const [displayNavBarCollapseButton, setDisplayNavBarCollapseButton] =
    useState(false);
  const { docVersion } = useDocVersionContext();
  const { navBarCollapsed, onChangeNavBarCollapsed } =
    useNavBarCollapsedContext();

  const handleCollapseButtonClick = useCallback(() => {
    onChangeNavBarCollapsed(!navBarCollapsed);
  }, [navBarCollapsed, onChangeNavBarCollapsed]);

  useEffect(() => {
    if (window && window.screen?.width <= 600) {
      setDisplayNavBarCollapseButton(true);
    }
  }, []);

  return (
    <nav
      className={classNames(
        styles.NavBar,
        navBarCollapsed ? styles.CollapsedNavBar : ""
      )}
    >
      <div className={styles.CollapsedDivContainer}>
        <div className={styles.LogoContainer}>
          <Link href="/" aria-label="collate-icon">
            <CollateIcon width={128} height={50} />
          </Link>
        </div>
        {displayNavBarCollapseButton && (
          <button
            className={styles.CollapseButton}
            onClick={handleCollapseButtonClick}
            aria-label="menu-icon"
          >
            {navBarCollapsed ? <MdMenu size={32} /> : <MdMenuOpen size={32} />}
          </button>
        )}
      </div>
      <SearchContextProvider>
        <InstantSearch
          indexName={`openmetadata-v1-${docVersion}`}
          searchClient={searchClient}
          future={{
            preserveSharedStateOnUnmount: false,
          }}
        >
          <Search />
        </InstantSearch>
      </SearchContextProvider>
      <a
        href="/swagger.html"
        target="_blank"
        title="Swagger"
        aria-label="api-icon"
      >
        <ApiIcon />
      </a>
    </nav>
  );
}
