import Markdoc from "@markdoc/markdoc";
import fs from "fs";
import matter from "gray-matter";
import { isEqual, isObject } from "lodash";
import { basename } from "path";
import { useMemo } from "react";
import Footer from "../components/Footer/Footer";
import Roadmap from "../components/Roadmap/Roadmap";
import TopNav from "../components/TopNav/TopNav";
import ErrorBoundary from "../docs-v1/components/ErrorBoundary";
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
import { processDynamicContent } from "../docs-v1/utils/SlugUtils";

interface Props {
  content: string;
  slug: string[];
  partials: Record<string, string>;
  noindex?: boolean;
  nofollow?: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

export default function Article({ content, slug, partials, pageTitle, pageDescription }: Readonly<Props>) {
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
            componentsList={{ Roadmap }}
            isCollate
          />
        )}
      </ErrorBoundary>
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
      noindex: false,
      nofollow: false,
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
      const { content, data } = matter(fileContents);

      props["content"] = content;
      props["slug"] = context.params.slug;
      props["partials"] = partials;
      props["noindex"] = data.noindex ?? false;
      props["nofollow"] = data.nofollow ?? false;
      props["pageTitle"] = data.title ?? "";
      props["pageDescription"] = data.description ?? "";
      
      if (props["pageTitle"] && props["pageTitle"].includes("`brandName`")) {
        props["pageTitle"] = processDynamicContent(props["pageTitle"], true); 
      }
      
      if (props["pageDescription"] && props["pageDescription"].includes("`brandName`")) {
        props["pageDescription"] = processDynamicContent(props["pageDescription"], true); 
      }
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
        title: data.title ? processDynamicContent(data.title as string, true) : "Untitled",
        description: data.description ? processDynamicContent(data.description as string, true) : "",
      },
    };

    paths.push(path);
  }

  return paths;
}
