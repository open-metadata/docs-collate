import Markdoc from "@markdoc/markdoc";
import fs from "fs";
import matter from "gray-matter";
import { isEqual, isObject } from "lodash";
import Script from "next/script";
import { basename } from "path";
import { useMemo } from "react";
import ErrorBoundary from "../docs-v1/components/ErrorBoundary";
import GoogleAnalyticsScript from "../docs-v1/components/GoogleAnalyticsScript/GoogleAnalyticsScript";
import APIPageLayout from "../docs-v1/components/PageLayouts/APIPageLayout/APIPageLayout";
import DocsPageLayout from "../docs-v1/components/PageLayouts/DocsPageLayout/DocsPageLayout";
import { API_AND_SDK_MENU_ITEMS } from "../docs-v1/constants/categoriesNav.constants";
import { PathObj } from "../docs-v1/interface/common.interface";
import {
  getArticleSlugFromString,
  getArticleSlugs,
  getPartialsConfigObject,
} from "../docs-v1/lib/api";
import { configs } from "../docs-v1/lib/markdoc";
import { getFormattedPartials } from "../docs-v1/utils/CommonUtils";
import Footer from "../components/Footer/Footer";
import TopNav from "../components/TopNav/TopNav";

interface Props {
  content: string;
  slug: string[];
  partials: Record<string, string>;
}

export default function Article({ content, slug, partials }: Readonly<Props>) {
  const ast = useMemo(() => Markdoc.parse(content), [content]);

  const formattedPartialsObj = useMemo(
    () => getFormattedPartials(partials),
    [partials]
  );

  const parsedContent = useMemo(
    () =>
      Markdoc.transform(ast, {
        ...configs,
        partials: formattedPartialsObj,
      }),
    [ast, configs, formattedPartialsObj]
  );

  const isAPIsPage = useMemo(() => {
    const matchedObject = API_AND_SDK_MENU_ITEMS.find((item) => {
      const slugFromItemPath = item.value.split("/");
      // Removing first element which will be empty
      slugFromItemPath.shift();

      return isEqual(slug, slugFromItemPath);
    });

    return isObject(matchedObject)
      ? { value: true, pageInfoObject: matchedObject }
      : { value: false, pageInfoObject: { label: "", value: "" } };
  }, [slug]);

  return (
    <>
      <Script
        id="show-banner"
        dangerouslySetInnerHTML={{
          __html: `              
                (function(window, document, dataLayerName, id) {
                  window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
                  function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
                  var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
                  var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
                  tags.async=!0,tags.src="https://collate.containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
                  !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
                  })(window, document, 'dataLayer', '85b94982-8c42-497f-96c9-353365f1fe7a');
                `,
        }}
      />
      <GoogleAnalyticsScript />
      <ErrorBoundary>
        {isAPIsPage.value ? (
          <APIPageLayout
            parsedContent={parsedContent}
            pageInfoObject={isAPIsPage.pageInfoObject}
          />
        ) : (
          <DocsPageLayout
            navbar={<TopNav />}
            parsedContent={parsedContent}
            slug={slug}
            footer={<Footer bordered />}
          />
        )}
      </ErrorBoundary>
    </>
  );
}

export async function getServerSideProps(context: {
  params: { version: string; slug: string[] };
}) {
  try {
    const paths = await getPaths();
    const props: Props = {
      content: "",
      slug: [],
      partials: {},
    };

    let location = `/${context.params.slug.join("/")}`;

    const partials = getPartialsConfigObject();

    if ("slug" in context.params) {
      let filename = "";
      let notFound = true;

      for (const obj of paths) {
        if (`${obj.params.location}` === location) {
          filename = obj.params.fileName;
          notFound = false;
          break;
        }
      }

      if (notFound) {
        return { notFound };
      }

      // Get the last element of the array to find the MD file
      const fileContents = fs.readFileSync(filename, "utf8");
      const { content } = matter(fileContents);

      props["content"] = content;
      props["slug"] = context.params.slug;
      props["partials"] = partials;
    }

    return { props };
  } catch {
    return {
      notFound: true,
    };
  }
}

async function getPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths: PathObj[] = [];

  // Load each file and map a path

  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data } = matter(fileContents);

    // Use slug instead of Category if it's present
    if ("slug" in data) {
      slug = data.slug;
      realSlug = data.slug.split("/").map(getArticleSlugFromString);
      realSlug.shift();
    }

    const slugsArray = articles[index].split("/");

    const versionIndex =
      slugsArray.findIndex((slugString) => slugString === "content") + 1;

    const version = slugsArray[versionIndex];

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        version: version,
        fileName: articles[index],
        title: data.title ? (data.title as string) : "Untitled",
        description: data.description ? (data.description as string) : "",
      },
    };

    paths.push(path);
  }

  return paths;
}
