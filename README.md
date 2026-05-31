# @ipikuka/mdx

**A robust Next.js newsletter `Next.js Weekly` is sponsoring me** 💖
[![NextjsWeekly banner](./assets/next-js-weekly.png)](https://nextjsweekly.com/)

A warm thanks 🙌 to [@ErfanEbrahimnia](https://github.com/ErfanEbrahimnia), [@recepkyk](https://github.com/recepkyk), and [@LSeaburg](https://github.com/LSeaburg) for the [support](https://github.com/sponsors/ipikuka) 💖

---

[![npm version][badge-npm-version]][url-npm-package]
[![npm downloads][badge-npm-download]][url-npm-package]
[![publish to npm][badge-publish-to-npm]][url-publish-github-actions]
[![code-coverage][badge-codecov]][url-codecov]
[![type-coverage][badge-type-coverage]][url-github-package]
[![typescript][badge-typescript]][url-typescript]
[![license][badge-license]][url-license]

This package is **an opinionated wrapper** of **[next-mdx-remote-client][next-mdx-remote-client]**. Since it is peer dependent to `next-mdx-remote-client` you need to install `next-mdx-remote-client` as well.

## When should I use this?

**`@ipikuka/mdx`** is battery-included. You don't need to add any remark, rehype, remark plugins because I included them already according to my expertise. If you need to add a plugin let me know opening an issue.

The **plugins** used in **`@ipikuka/mdx`** comes from [**`@ipikuka/plugins`**](https://github.com/ipikuka/plugins/) which provides **`remarkPlugins`**, **`rehypePlugins`**, **`recmaPlugins`**.

The **rehype handlers** used in **`@ipikuka/mdx`** comes from [**`@ipikuka/handlers`**](https://github.com/ipikuka/handlers/) which provides **`remarkRehypeOptions["handlers"]`**.

Thanks to **`@ipikuka/plugins`** and **`@ipikuka/handlers`**, markdown/MDX content will support:
+ **bold texts**, **italic texts**,
+ **lists**, **blockquotes**, **headings**,
+ **table of contents (TOC)**,
+ **containers**, **admonitions**, **callouts**,
+ **marked texts**, **inserted texts**,
+ **centered paragraphs**, **aligned paragraphs**,
+ **guillements**, 
+ **gfm syntax** (tables, strikethrough, task lists, autolinks, footnotes etc.),
+ **highlighted and numbered code fences**,
+ **code titles**,
+ **autolink for headers**,
+ **abbreviations**,
+ **inline footnotes**,
+ **enhanced markdown image syntax**,
+ **definition lists** etc. and many more.

## Installation

This package is suitable for ESM module only. In Node.js (16.0+), install with npm:

```bash
npm install @ipikuka/mdx next-mdx-remote-client

# if you are using react@19 specifically
npm install @ipikuka/mdx next-mdx-remote-client@2

# if you are using react@18 specifically
npm install @ipikuka/mdx next-mdx-remote-client@1
```

or

```bash
yarn add @ipikuka/mdx next-mdx-remote-client

# if you are using react@19 specifically
yarn add @ipikuka/mdx next-mdx-remote-client@2

# if you are using react@18 specifically
yarn add @ipikuka/mdx next-mdx-remote-client@1
```

## Usage

This package is peer dependant with `react`, `react-dom` and `next-mdx-remote-client` so it is assumed that you have already installed them.

### Example with `Next.js` pages router

**`@ipikuka/mdx`** provides a **`serialize`** function. The `serialize` function is an opinionated wrapper of the `serialize` function of the **`next-mdx-remote-client`** which is a set of light utilities allowing MDX to be loaded within `getStaticProps` or `gerServerSideProps` and hydrated correctly on the client.

**`@ipikuka/mdx`** provides also **`hydrate`** function and **`MDXClient`** component for "pages" router.

See for more details about [**`next-mdx-remote-client`**](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-pages-router).

```js
import { serialize } from "@ipikuka/mdx/serialize";
import { MDXClient } from "@ipikuka/mdx";

import ErrorComponent from "../components/ErrorComponent";
import { TableOfComponent, Test } from "../mdxComponents";

const components = {
  TableOfComponent,
  Test,
  wrapper: ({ children }) => <div className="mdx-wrapper">{children}</div>,
};

export default function Page({ mdxSource }) {
  if ("error" in mdxSource) {
    return <ErrorComponent error={mdxSource.error} />;
  }

  return <MDXClient {...mdxSource} components={components} />;
}

export async function getStaticProps() {
  const source = `---
title: My Article
---
<TableOfComponent toc={toc} />

Some **bold** and ==marked== text in MDX.

~|> Centered paragraph (thanks to remark-flexible-paragraphs)

With a component <Test />

::: tip The Title of The Container
The content of the tip (thanks to remark-flexible-containers)
:::
`;

  const mdxSource = await serialize({
    source,
    options: { parseFrontmatter: true },
  });

  return { props: { mdxSource } };
}
```

### Example with `Next.js` app router

The **`@ipikuka/mdx`** provides **`evaluate`** function and **`MDXRemote`** component for "app" router.

See for more details about [**`next-mdx-remote-client`**](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-app-router).

```js
import { Suspense } from "react";
import { MDXRemote } from "@ipikuka/mdx/rsc";

import { ErrorComponent, LoadingComponent } from "../components";
import { TableOfComponent, Test } from "../mdxComponents";

const components = {
  TableOfComponent,
  Test,
  wrapper: ({ children }) => <div className="mdx-wrapper">{children}</div>,
};

export default async function Page() {
  const source = `---
title: My Article
---
<TableOfComponent toc={toc} />

Some **bold** and ==marked== text in MDX.

~|> Centered paragraph (thanks to remark-flexible-paragraphs)

With a component <Test />

::: tip The Title of The Container
The content of the tip (thanks to remark-flexible-containers)
:::
`;

  return (
    <Suspense fallback={<LoadingComponent />}>
      <MDXRemote
        source={source}
        options={{ parseFrontmatter: true }}
        components={components}
        onError={ErrorComponent}
      />
    </Suspense>
  );
}
```

## Options

**`@ipikuka/mdx`** has the same options with **`next-mdx-remote-client`** as a wrapper.

See **[next-mdx-remote-client][next-mdx-remote-client]**.

## Types

**`@ipikuka/mdx`** is fully typed with [TypeScript][url-typescript] and exposes the same types as **`next-mdx-remote-client`** does.

See **[next-mdx-remote-client][next-mdx-remote-client]**.

## Compatibility

It is a **`Nextjs`** compatible package.

## Security

This package has the same security concerns with **[next-mdx-remote-client][next-mdx-remote-client]**.

## My Plugins

I like to contribute the Unified / Remark / MDX ecosystem, so I recommend you to have a look my plugins.

### Support My Work ([become a sponsor](https://github.com/sponsors/ipikuka) 🚀)

If you find **`@ipikuka/plugins`** or any of my projects is useful and helpful, please consider supporting my work. Your sponsorship means a lot to me and keeps these projects alive and updated! 💖

My sponsors are going to be featured at the very top of the page and proudly displayed on my [Sponsor Wall](https://github.com/sponsors/ipikuka).

Thank you for supporting open source! 🙌

### My Remark Plugins

- [`remark-flexible-code-titles`](https://www.npmjs.com/package/remark-flexible-code-titles)
  – Remark plugin to add titles or/and containers for the code blocks with customizable properties
- [`remark-flexible-containers`](https://www.npmjs.com/package/remark-flexible-containers)
  – Remark plugin to add custom containers with customizable properties in markdown
- [`remark-ins`](https://www.npmjs.com/package/remark-ins)
  – Remark plugin to add `ins` element in markdown
- [`remark-flexible-paragraphs`](https://www.npmjs.com/package/remark-flexible-paragraphs)
  – Remark plugin to add custom paragraphs with customizable properties in markdown
- [`remark-flexible-markers`](https://www.npmjs.com/package/remark-flexible-markers)
  – Remark plugin to add custom `mark` element with customizable properties in markdown
- [`remark-flexible-toc`](https://www.npmjs.com/package/remark-flexible-toc)
  – Remark plugin to expose the table of contents via `vfile.data` or via an option reference
- [`remark-mdx-remove-esm`](https://www.npmjs.com/package/remark-mdx-remove-esm)
  – Remark plugin to remove import and/or export statements (mdxjsEsm)
- [`remark-mdx-remove-expressions`](https://www.npmjs.com/package/remark-mdx-remove-expressions)
  – Remark plugin to remove MDX expressions within curlybraces {} in MDX content

### My Rehype Plugins

- [`rehype-pre-language`](https://www.npmjs.com/package/rehype-pre-language)
  – Rehype plugin to add language information as a property to `pre` element
- [`rehype-highlight-code-lines`](https://www.npmjs.com/package/rehype-highlight-code-lines)
  – Rehype plugin to add line numbers to code blocks and allow highlighting of desired code lines
- [`rehype-code-meta`](https://www.npmjs.com/package/rehype-code-meta)
  – Rehype plugin to copy `code.data.meta` to `code.properties.metastring`
- [`rehype-image-toolkit`](https://www.npmjs.com/package/rehype-image-toolkit)
  – Rehype plugin to enhance Markdown image syntax `![]()` and Markdown/MDX media elements (`<img>`, `<audio>`, `<video>`) by auto-linking bracketed or parenthesized image URLs, wrapping them in `<figure>` with optional captions, unwrapping images/videos/audio from paragraph, parsing directives in title for styling and adding attributes, and dynamically converting images into `<video>` or `<audio>` elements based on file extension.

### My Recma Plugins

- [`recma-mdx-escape-missing-components`](https://www.npmjs.com/package/recma-mdx-escape-missing-components)
  – Recma plugin to set the default value `() => null` for the Components in MDX in case of missing or not provided so as not to throw an error
- [`recma-mdx-change-props`](https://www.npmjs.com/package/recma-mdx-change-props)
  – Recma plugin to change the `props` parameter into the `_props` in the `function _createMdxContent(props) {/* */}` in the compiled source in order to be able to use `{props.foo}` like expressions. It is useful for the `next-mdx-remote` or `next-mdx-remote-client` users in `nextjs` applications.
- [`recma-mdx-change-imports`](https://www.npmjs.com/package/recma-mdx-change-imports)
  – Recma plugin to convert import declarations for assets and media with relative links into variable declarations with string URLs, enabling direct asset URL resolution in compiled MDX.
- [`recma-mdx-import-media`](https://www.npmjs.com/package/recma-mdx-import-media)
  – Recma plugin to turn media relative paths into import declarations for both markdown and html syntax in MDX.
- [`recma-mdx-import-react`](https://www.npmjs.com/package/recma-mdx-import-react)
  – Recma plugin to ensure getting `React` instance from the arguments and to make the runtime props `{React, jsx, jsxs, jsxDev, Fragment}` is available in the dynamically imported components in the compiled source of MDX.
- [`recma-mdx-html-override`](https://www.npmjs.com/package/recma-mdx-html-override)
  – Recma plugin to allow selected raw HTML elements to be overridden via MDX components.
- [`recma-mdx-interpolate`](https://www.npmjs.com/package/recma-mdx-interpolate)
  – Recma plugin to enable interpolation of identifiers wrapped in curly braces within the `alt`, `src`, `href`, and `title` attributes of markdown link and image syntax in MDX.

### My Unist Utils and Unified Plugins

I also build low-level utilities and plugins for the Unified ecosystem that can be used across Remark, Rehype, Recma, and other unist-based abstract syntax trees (ASTs).

- [`unist-util-find-between`](https://www.npmjs.com/package/unist-util-find-between)
  – Unist utility to find the nodes between two nodes.
- [`unified-log-tree`](https://www.npmjs.com/package/unified-log-tree)
  – Unified plugin to log abstract syntax trees (ASTs) for debugging without mutating.

## License

[MIT License](./LICENSE) © ipikuka

[unifiednpm]: https://www.npmjs.com/search?q=keywords:unified
[mdx-jsnpm]: https://www.npmjs.com/package/@mdx-js/mdx
[next-mdx-remote-client]: https://github.com/ipikuka/next-mdx-remote-client
[ipikukapluginsnpm]: https://www.npmjs.com/package/@ipikuka/plugins
[markdownnpm]: https://www.npmjs.com/search?q=keywords:markdown
[mdxnpm]: https://www.npmjs.com/search?q=keywords:mdx

[badge-npm-version]: https://img.shields.io/npm/v/@ipikuka/mdx
[badge-npm-download]:https://img.shields.io/npm/dt/@ipikuka/mdx

[url-npm-package]: https://www.npmjs.com/package/@ipikuka/mdx
[url-github-package]: https://github.com/ipikuka/mdx

[badge-license]: https://img.shields.io/github/license/ipikuka/mdx
[url-license]: https://github.com/ipikuka/mdx/blob/main/LICENSE

[badge-publish-to-npm]: https://github.com/ipikuka/mdx/actions/workflows/publish.yml/badge.svg
[url-publish-github-actions]: https://github.com/ipikuka/mdx/actions/workflows/publish.yml

[badge-typescript]: https://img.shields.io/npm/types/@ipikuka/mdx
[url-typescript]: https://www.typescriptlang.org

[badge-codecov]: https://codecov.io/gh/ipikuka/mdx/graph/badge.svg?token=PM2ZLJTBMN
[url-codecov]: https://codecov.io/gh/ipikuka/mdx

[badge-type-coverage]: https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fipikuka%2Fmdx%2Fmain%2Fpackage.json
