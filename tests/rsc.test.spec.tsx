import { describe, expect, test } from "vitest";
import * as React from "react";
import ReactDOMServer from "react-dom/server";

import { evaluate, MDXRemote } from "../src/rsc.js";

describe("rsc", () => {
  test("evaluate returns reactive MDX content", async () => {
    const result = await evaluate({
      source: "foo **bar**",
      options: { mdxOptions: { format: "mdx" } },
    });

    expect(result.error).toBeUndefined();
    expect(ReactDOMServer.renderToStaticMarkup(result.content)).toMatchInlineSnapshot(
      `"<p>foo <strong>bar</strong></p>"`,
    );
  });

  test("evaluate supports md format and keeps source content", async () => {
    const result = await evaluate({
      source: "foo **bar**",
      options: { mdxOptions: { format: "md" } },
    });

    expect(result.error).toBeUndefined();
    expect(ReactDOMServer.renderToStaticMarkup(result.content)).toMatchInlineSnapshot(
      `"<p>foo <strong>bar</strong></p>"`,
    );
  });

  test("MDXRemote renders content successfully", async () => {
    const element = await MDXRemote({
      source: '<Test name="test" />',
      components: {
        Test: ({ name }: { name: string }) => <p>{name}</p>,
      },
    });

    const html = ReactDOMServer.renderToStaticMarkup(element);
    expect(html).toEqual("<p>test</p>");
  });

  test("MDXRemote throws when evaluation fails and no ErrorComponent is provided", async () => {
    await expect(async () => {
      await MDXRemote({ source: "<missing closing tag" });
    }).rejects.toThrow();
  });

  test("MDXRemote returns the ErrorComponent when evaluation fails", async () => {
    const ErrorComponent = ({ error }: { error: Error }) => <p>{error.message}</p>;

    const element = await MDXRemote({
      source: "<missing closing tag",
      onError: ErrorComponent,
    });

    const html = ReactDOMServer.renderToStaticMarkup(element);
    expect(html).toContain("error");
  });
});
