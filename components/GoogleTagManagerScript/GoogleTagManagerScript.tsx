import Script from "next/script";

function GoogleTagManagerScript() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8N4ZPTEDL2" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-8N4ZPTEDL2');
        `}
      </Script>
    </>
  );
}

export default GoogleTagManagerScript;
