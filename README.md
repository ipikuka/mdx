# @ipikuka/mdx

[![NPM version][badge-npm-version]][npm-package-url]
[![NPM downloads][badge-npm-download]][npm-package-url]
[![Build][badge-build]][github-workflow-url]
[![typescript][badge-typescript]][typescript-url]
[![License][badge-license]][github-license-url]

This package is an opinionated wrapper of [next-mdx-remote-client][next-mdx-remote-client].

## When should I use this?

The `@ipikuka/mdx` is battery-included. You don't need to add any remark, rehype, remark plugins because I included them already according to my expertise. If you need to add a plugin let me know opening an issue.

The **plugins** used in the `@ipikuka/mdx` comes from [**`@ipikuka/plugins`**](https://github.com/ipikuka/plugins/).

**`@ipikuka/plugins`** provides **`remarkPlugins`**, **`rehypePlugins`**, **`recmaPlugins`**, and **`remarkRehypeOptions`**.

Thanks to `@ipikuka/plugins`, the markdown content or MDX content will support **table of contents**, **containers**, **markers**, **aligned paragraphs**, **gfm syntax** (tables, strikethrough, task lists, autolinks etc.), **inserted texts**, **highlighted code fences**, **code titles**, **autolink for headers**, **definition lists** etc. in addition to standard markdown syntax like **bold texts**, **italic texts**, **lists**, **blockquotes**, **headings** etc.

## Installation

This package is suitable for ESM module only. In Node.js (16.0+), install with npm:

```bash
npm install @ipikuka/mdx
```

or

```bash
yarn add @ipikuka/mdx
```

## Usage

This package is peer dependant with `react`, `react-dom`; so it is assumed that you have already installed.

### Example with `Next.js` pages router

The `@ipikuka/mdx` provides a **`serialize`** function. The `serialize` function is an opinionated wrapper of the `serialize` function of the `next-mdx-remote-client` which is a set of light utilities allowing MDX to be loaded within `getStaticProps` or `gerServerSideProps` and hydrated correctly on the client. The `@ipikuka/mdx` provides also **`hydrate`** function and **`MDXClient`** component for "pages" router. See for more details about `next-mdx-remote-client` at [here](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-pages-router).

```js
import { serialize } from "@ipikuka/mdx/serialize";
import { MDXClient } from "@ipikuka/mdx";

import ErrorComponent from "../components/ErrorComponent";
import Test from "../mdxComponents/Test";

const components = {
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
  // the source can be from a local file, database, anywhere
  const source =
    "Some **bold** and ==marked== text in MDX, with a component <Test />";

  // the remark, rehype, recma plugins from `@ipikuka/plugins` are included in behind
  // the plugin list are opinionated, see `@ipikuka/plugins`

  const mdxSource = await serialize({
    source,
    options: { parseFrontmatter: true },
  });

  return { props: { mdxSource } };
}
```

### Example with `Next.js` app router

The `@ipikuka/mdx` provides **`evaluate`** function and **`MDXRemote`** component for "app" router. See for more details about `next-mdx-remote-client` at [here](https://github.com/ipikuka/next-mdx-remote-client?tab=readme-ov-file#the-part-associated-with-nextjs-app-router).

```js
import { Suspense } from "react";
import { MDXRemote } from "@ipikuka/mdx/rsc";

import { ErrorComponent, LoadingComponent } from "../components";
import { Test } from "../mdxComponents";

const components = {
  Test,
  wrapper: ({ children }) => <div className="mdx-wrapper">{children}</div>,
};

export default function Page({ mdxSource }) {
  // the source can be from a local file, database, anywhere
  const source =
    "Some **bold** and ==marked== text in MDX, with a component <Test />";

  // the remark, rehype, recma plugins from `@ipikuka/plugins` are included in behind
  // the plugin list are opinionated, see `@ipikuka/plugins`

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

`@ipikuka/mdx` has the same options with `next-mdx-remote-client` as a wrapper. See [next-mdx-remote-client][next-mdx-remote-client].

## Types

This package is fully typed with [TypeScript][typeScript] and exposes the same types as `next-mdx-remote-client` does.

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
