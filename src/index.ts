export {
  hydrate,
  hydrateLazy,
  MDXClient,
  MDXClientLazy,
  // below from "@mdx-js/react"
  MDXProvider,
  useMDXComponents,
} from "next-mdx-remote-client";

export type {
  HydrateProps,
  HydrateResult,
  MDXClientProps,
  SerializeResult,
  // below are experimantal
  HydrateAsyncProps,
  HydrateAsyncOptions,
  // below from "mdx/types"
  MDXComponents,
  MDXContent,
  MDXProps,
  MDXModule,
} from "next-mdx-remote-client";

export type { TocItem } from "@ipikuka/plugins";
