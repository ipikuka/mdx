import React from "react";
import ReactDOMServer from "react-dom/server";

import { serialize, type SerializeProps } from "../../src/serialize.js";

import { MDXClient, type MDXComponents } from "../../src/csr.js";

export async function renderStatic({
  source,
  options,
  components,
}: {
  source: SerializeProps["source"];
  options?: SerializeProps["options"];
  components?: MDXComponents;
}): Promise<string> {
  const mdxSource = await serialize({ source, options });

  if ("error" in mdxSource) throw mdxSource.error;

  return ReactDOMServer.renderToStaticMarkup(
    <MDXClient {...mdxSource} components={components} />,
  );
}
