# @ipikuka/mdx

[![NPM version][badge-npm-version]][npm-package-url]
[![NPM downloads][badge-npm-download]][npm-package-url]
[![Build][badge-build]][github-workflow-url]
[![typescript][badge-typescript]][typescript-url]
[![License][badge-license]][github-license-url]

This package is **an opinionated wrapper** of **[next-mdx-remote-client][next-mdx-remote-client]**. Since it is peer dependent to `next-mdx-remote-client` you need to install `next-mdx-remote-client` as well.

## When should I use this?

The **`@ipikuka/mdx`** is battery-included. You don't need to add any remark, rehype, remark plugins because I included them already according to my expertise. If you need to add a plugin let me know opening an issue.

The **plugins** used in the **`@ipikuka/mdx`** comes from [**`@ipikuka/plugins`**](https://github.com/ipikuka/plugins/).

**`@ipikuka/plugins`** provides **`remarkPlugins`**, **`rehypePlugins`**, **`recmaPlugins`**, and **`remarkRehypeOptions`**.

Thanks to `@ipikuka/plugins`, the markdown content or MDX content will support:
+ **bold texts**, **italic texts**,
+ **lists**, **blockquotes**, **headings**,
+ **table of contents (TOC)**,
+ **containers**, **admonitions**, **callouts**,
+ **marked texts**, **inserted texts**,
+ **centered paragraphs**, **aligned paragraphs**,
+ **guillements**, 
+ **gfm syntax** (tables, strikethrough, task lists, autolinks etc.),
+ **highlighted and numbered code fences**,
+ **code titles**,
+ **autolink for headers**,
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

The **`@ipikuka/mdx`** provides a **`serialize`** function. The `serialize` function is an opinionated wrapper of the `serialize` function of the `next-mdx-remote-client` which is a set of light utilities allowing MDX to be loaded within `getStaticProps` or `gerServerSideProps` and hydrated correctly on the client.

The `@ipikuka/mdx` provides also **`hydrate`** function and **`MDXClient`** component for "pages" router.

See for more details about `next-mdx-remote-client` at [here](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-pages-router).

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

See for more details about `next-mdx-remote-client` at [here](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-app-router).

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

See [next-mdx-remote-client][next-mdx-remote-client].

## Types

**`@ipikuka/mdx`** is fully typed with [TypeScript][typescript-url] and exposes the same types as **`next-mdx-remote-client`** does.

See [next-mdx-remote-client][next-mdx-remote-client].

## Compatibility

It is a `Nextjs` compatible package.

## Security

This package has the same security concerns with [next-mdx-remote-client][next-mdx-remote-client].

## License

[MIT License](./LICENSE) © ipikuka

### Keywords

🟩 [unified][unifiednpm] 🟩 [@mdx-js/mdx][mdx-jsnpm] 🟩 [next-mdx-remote-client][next-mdx-remote-client] 🟩 [@ipikuka/plugins][ipikukapluginsnpm] 🟩 [markdown][markdownnpm] 🟩 [mdx][mdxnpm]

[unifiednpm]: https://www.npmjs.com/search?q=keywords:unified
[mdx-jsnpm]: https://www.npmjs.com/package/@mdx-js/mdx
[next-mdx-remote-client]: https://github.com/ipikuka/next-mdx-remote-client
[ipikukapluginsnpm]: https://www.npmjs.com/package/@ipikuka/plugins
[markdownnpm]: https://www.npmjs.com/search?q=keywords:markdown
[mdxnpm]: https://www.npmjs.com/search?q=keywords:mdx

[badge-npm-version]: https://img.shields.io/npm/v/@ipikuka/mdx
[badge-npm-download]: https://img.shields.io/npm/dt/@ipikuka/mdx
[npm-package-url]: https://www.npmjs.com/package/@ipikuka/mdx

[badge-license]: https://img.shields.io/github/license/ipikuka/mdx
[github-license-url]: https://github.com/ipikuka/mdx/blob/main/LICENSE

[badge-build]: https://github.com/ipikuka/mdx/actions/workflows/publish.yml/badge.svg
[github-workflow-url]: https://github.com/ipikuka/mdx/actions/workflows/publish.yml

[badge-typescript]: https://img.shields.io/npm/types/@ipikuka/mdx
[typescript-url]: https://www.typescriptlang.org/
