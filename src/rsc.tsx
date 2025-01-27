import React from "react";
import { evaluate as evaluate_ } from "next-mdx-remote-client/rsc";
import type {
  EvaluateProps,
  EvaluateResult,
  MDXRemoteProps,
} from "next-mdx-remote-client/rsc";

export type {
  MDXRemoteProps,
  MDXRemoteOptions,
  EvaluateProps,
  EvaluateOptions,
  EvaluateResult,
  MDXComponents,
  MDXContent,
  MDXProps,
  MDXModule,
} from "next-mdx-remote-client/rsc";

import { plugins, prepare, type TocItem } from "@ipikuka/plugins";
export type { TocItem } from "@ipikuka/plugins";

/**
 *
 * Opinionated evaluate wrapper for "next-mdx-remote/rsc"
 *
 */
export async function evaluate<
  TFrontmatter extends Record<string, unknown> = Record<string, unknown>,
  TScope extends Record<string, unknown> = Record<string, unknown>,
>({
  source,
  options = {},
  components = {},
}: EvaluateProps<TScope>): Promise<
  EvaluateResult<TFrontmatter, TScope & { toc?: TocItem[] }>
> {
  const { mdxOptions, ...rest } = options || {};

  const format_ = mdxOptions?.format;
  const format = format_ === "md" || format_ === "mdx" ? format_ : "mdx";
  const processedSource = format === "mdx" ? prepare(source) : source;

  return await evaluate_<TFrontmatter, TScope>({
    source: processedSource,
    options: {
      mdxOptions: {
        ...mdxOptions,
        ...plugins({ format }),
      },
      vfileDataIntoScope: "toc",
      ...rest,
    },
    components,
  });
}

/**
 *
 * MDXRemote which uses opinionated wrapper evalute for "next-mdx-remote/rsc"
 *
 */
export async function MDXRemote(
  props: MDXRemoteProps,
): Promise<React.JSX.Element> {
  const { onError: ErrorComponent, ...rest } = props;

  const { content, error } = await evaluate(rest);

  if (error && !ErrorComponent) throw error;

  if (error && ErrorComponent) return <ErrorComponent error={error} />;

  return content;
}
