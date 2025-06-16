import Head from "next/head";
import React, { useEffect, useState } from "react";

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
import CookieModal from "../components/CookieModal/CookieModal";
import { HOST_NAME } from "../constants/Homepage.constants";
import { SlugProps } from "../docs-v1/pages/[version]/[...slug]";

const TITLE = "Collate Documentation: Get Help Instantly";
const DESCRIPTION = "Unified Platform for data discovery, observability and governance.";

export type MyAppProps = MarkdocNextJsPageProps & Partial<SlugProps>;

declare global {
  interface Window {
      dataLayer: Record<string, any>[];
  }
}

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const [storedCookie, setStoredCookie] = useState<string | null>(null);
  const { slug, noindex, nofollow } = pageProps;

  const canonicalUrl = `${HOST_NAME}${slug?.join('/') || ''}`;

	const handleButtonClick = (choice: string) => {
        localStorage.setItem('docsCollateCookie', choice)
        setStoredCookie(choice)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userCookie = window.localStorage.getItem('docsCollateCookie')
            setStoredCookie(userCookie)
        }
    }, [])

    useEffect(() => {
      if (!storedCookie || storedCookie === 'Accept') {
          // Google Tag Manager
          const gtmTagScript = document.createElement('script')
          gtmTagScript.innerHTML = `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-554C968W');
          `
          gtmTagScript.id = 'gtm-init'
          document.head.appendChild(gtmTagScript)
      } else {
          window.dataLayer = []

          const scriptTags = document.querySelectorAll(
              'script[src*="googletagmanager"], script#gtm-init'
          )
          scriptTags.forEach((tag) => tag.remove())
      }
  }, [storedCookie])
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" />
        <meta name="theme-color" content="#ffffff" />
        <meta content="Collate Docs" property="og:title" />
        <meta content="Collate Docs" name="twitter:title" />
        <meta
          name="keywords"
          content="best open-source data catalog, #1 open source data catalog, openmetadata documentation, data governance solutions, centralized metadata platform, best data discovery tool, data collaboration platform, modern data catalog, data catalog data lineage, best metadata management tool"
        />
        {(noindex || nofollow) ? (
          <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
        ): (
          <link rel="canonical" href={canonicalUrl} />
        )}
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
            <DocVersionContextProvider enableVersion={false}>
              <MenuItemsContextProvider>
                <NavBarCollapseContextProvider>
                  <StepsContextProvider>
                    <CodeWithLanguageSelectorContextProvider>
                      {!storedCookie && (
                        <CookieModal handleButtonClick={handleButtonClick} />
                      )}
                      <Component {...pageProps} />
                    </CodeWithLanguageSelectorContextProvider>
                  </StepsContextProvider>
                </NavBarCollapseContextProvider>
              </MenuItemsContextProvider>
            </DocVersionContextProvider>
          </RouteChangingContextProvider>
        </ErrorBoundary>
    </>
  )
}
