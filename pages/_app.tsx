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
import GoogleTagManagerScript from "../components/GoogleTagManagerScript/GoogleTagManagerScript";
import CookieModal from "../components/CookieModal/CookieModal";

const TITLE = "Collate Documentation: Get Help Instantly";
const DESCRIPTION = "Unified Platform for data discovery, observability and governance.";

export type MyAppProps = MarkdocNextJsPageProps;

declare global {
  interface Window {
      dataLayer: Record<string, any>[];
  }
}

export default function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const [storedCookie, setStoredCookie] = useState<string | null>(null);

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
            const gtmScript = document.createElement('script')
            gtmScript.src =
                'https://www.googletagmanager.com/gtag/js?id=G-8N4ZPTEDL2'
            gtmScript.async = true
            document.head.appendChild(gtmScript)

            const inlineScript = document.createElement('script')
            inlineScript.id = 'gtag-init'
            inlineScript.defer = true
            inlineScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8N4ZPTEDL2');
          `
            document.head.appendChild(inlineScript)
        } else {
            window.dataLayer = []

            const scriptTags = document.querySelectorAll(
                'script[src*="googletagmanager"], script#gtag-init'
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
      {!storedCookie || storedCookie === 'Accept' && <GoogleTagManagerScript />}
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
