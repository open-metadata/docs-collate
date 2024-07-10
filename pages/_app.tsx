import Head from "next/head";
import React from "react";

import "prismjs";
// Import other Prism themes here
import "../docs-v1/public/modal.css";
import "../public/globals.css";

import type { MarkdocNextJsPageProps } from "@markdoc/next.js";
import type { AppProps } from "next/app";
import ErrorBoundary from "../docs-v1/components/ErrorBoundary";
import { CodeWithLanguageSelectorContextProvider } from "../docs-v1/context/CodeWithLanguageSelectorContext";
import { DocVersionContextProvider } from "../docs-v1/context/DocVersionContext";
import { MenuItemsContextProvider } from "../docs-v1/context/MenuItemsContext";
import { NavBarCollapseContextProvider } from "../docs-v1/context/NavBarCollapseContext";
import { RouteChangingContextProvider } from "../docs-v1/context/RouteChangingContext";
import { StepsContextProvider } from "../docs-v1/context/StepsContext";

const TITLE = "Collate Documentation: Get Help Instantly";
const DESCRIPTION =
  "Follow the step-by-step guides to get started with Collate, the #1 open source data catalog tool. Get discovery, collaboration, governance, observability, quality tools all in one place.";

export type MyAppProps = MarkdocNextJsPageProps;

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="theme-color" content="#ffffff" />
        <meta content="Collate Docs" property="og:title" />
        <meta content="Collate Docs" name="twitter:title" />
        <meta
          name="keywords"
          content="best open-source data catalog, #1 open source data catalog, openmetadata documentation, data governance solutions, centralized metadata platform, best data discovery tool, data collaboration platform, modern data catalog, data catalog data lineage, best metadata management tool"
        />
        {DESCRIPTION && (
          <React.Fragment>
            <meta content={DESCRIPTION} name="description" />
            <meta content={DESCRIPTION} property="og:description" />
            <meta content={DESCRIPTION} name="twitter:description" />
          </React.Fragment>
        )}
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        {/* Temporarily commenting out the GiffyGPT code as it is giving 404 */}
        {/* <script
          src="https://jiffygpt.com/embed.js"
          id={process.env.NEXT_PUBLIC_GIFFY_GPT_ID}
          defer
        ></script> */}
      </Head>
      <ErrorBoundary>
        <RouteChangingContextProvider>
          <DocVersionContextProvider>
            <MenuItemsContextProvider>
              <NavBarCollapseContextProvider>
                <StepsContextProvider>
                  <CodeWithLanguageSelectorContextProvider>
                    <Component {...pageProps} />
                  </CodeWithLanguageSelectorContextProvider>
                </StepsContextProvider>
              </NavBarCollapseContextProvider>
            </MenuItemsContextProvider>
          </DocVersionContextProvider>
        </RouteChangingContextProvider>
      </ErrorBoundary>
    </>
  );
}
