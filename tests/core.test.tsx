import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { VFile } from "vfile";
import dedent from "dedent";

import { MDXClient, MDXProvider, type MDXComponents } from "../src/csr.js";
import { serialize } from "../src/serialize.js";

import { renderStatic } from "./utils";

/**
 *
 * I used the same tests with `next-mdx-remote` in order to provide the same "serialize" functionality
 *
 */

describe("serialize", () => {
  // ******************************************
  test("minimal", async () => {
    const result = await renderStatic({ source: "foo **bar**" });

    expect(result).toMatchInlineSnapshot(`"<p>foo <strong>bar</strong></p>"`);
  });

  // ******************************************
  test("with component", async () => {
    const result = await renderStatic({
      source: 'foo <Test name="test" />',
      components: {
        Test: ({ name }: { name: string }) => <span>hello {name}</span>,
      },
    });

    expect(result).toMatchInlineSnapshot(
      `"<p>foo <span>hello test</span></p>"`,
    );
  });

  // ******************************************
  test("flexible paragraphs", async () => {
    const result = await renderStatic({ source: "~> hello" });

    expect(result).toMatchInlineSnapshot(
      `"<p class="flexible-paragraph">hello</p>"`,
    );
  });

  // ******************************************
  test("with scope", async () => {
    const result = await renderStatic({
      source: "<Test name={bar} />",
      components: {
        Test: ({ name }: { name: string }) => <p>{name}</p>,
      },
      options: {
        scope: {
          bar: "test",
        },
      },
    });

    expect(result).toMatchInlineSnapshot(`"<p>test</p>"`);
  });

  // ******************************************
  test("with custom provider", async () => {
    const TestContext = React.createContext<null | string>(null);

    const mdxSource = await serialize({ source: "<Test />" });

    if ("error" in mdxSource) throw mdxSource.error;

    const components: MDXComponents = {
      Test: () => (
        <TestContext.Consumer>{(value) => <p>{value}</p>}</TestContext.Consumer>
      ),
    };

    const result = ReactDOMServer.renderToStaticMarkup(
      <TestContext.Provider value="provider-value">
        <MDXClient {...mdxSource} components={components} />
      </TestContext.Provider>,
    );

    expect(result).toMatchInlineSnapshot(`"<p>provider-value</p>"`);
  });

  // ******************************************
  test("with MDXProvider providing custom components", async () => {
    const mdxSource = await serialize({ source: "<Test />" });

    if ("error" in mdxSource) throw mdxSource.error;

    const components: MDXComponents = {
      Test: () => <p>Hello world</p>,
    };

    const result = ReactDOMServer.renderToStaticMarkup(
      <MDXProvider components={components}>
        <MDXClient {...mdxSource} />
      </MDXProvider>,
    );

    expect(result).toMatchInlineSnapshot(`"<p>Hello world</p>"`);
  });

  // ******************************************
  test("supports component names with a .", async () => {
    const mdxSource = await serialize({ source: "<motion.p />" });

    if ("error" in mdxSource) throw mdxSource.error;

    const components: MDXComponents = {
      motion: { p: () => <p>Hello world</p> },
    };

    const result = ReactDOMServer.renderToStaticMarkup(
      <MDXClient {...mdxSource} components={components} />,
    );

    expect(result).toMatchInlineSnapshot(`"<p>Hello world</p>"`);
  });

  // ******************************************
  test("strips imports & exports", async () => {
    const source = dedent(`
      import foo from 'bar';

      foo **bar**
      
      export const bar = 'bar';
    `);

    const result = await renderStatic({
      source,
      options: { disableImports: true },
    });

    expect(result).toMatchInlineSnapshot(`"<p>foo <strong>bar</strong></p>"`);
  });

  // ******************************************
  test("fragments", async () => {
    const components: MDXComponents = {
      Test: ({ content }: { content: string }) => <>{content}</>,
    };

    const result = await renderStatic({
      source: `<Test content={<>Rendering a fragment</>} />`,
      components,
    });

    expect(result).toMatchInlineSnapshot(`"Rendering a fragment"`);
  });

  // ******************************************
  test("parses frontmatter - serialize result 1", async () => {
    const source = dedent(`
      ---
      hello: world
      ---
      # Hello
    `);

    const mdxSource = await serialize({
      source,
      options: {
        parseFrontmatter: true,
      },
    });

    if ("error" in mdxSource) throw mdxSource.error;

    // Validating type correctness here, this should not error
    expect(<MDXClient {...mdxSource} />).toBeTruthy();

    expect(mdxSource.frontmatter.hello).toEqual("world");
  });

  // ******************************************
  test("parses frontmatter - serialize result 2", async () => {
    const source = dedent(`
      ---
      tags:
        - javascript
        - html
      ---
      # Tags
    `);

    const mdxSource = await serialize({
      source,
      options: { parseFrontmatter: true },
    });

    if ("error" in mdxSource) throw mdxSource.error;

    // Validating type correctness here, this should not error
    expect(<MDXClient {...mdxSource} />).toBeTruthy();

    expect(mdxSource.frontmatter.tags).toEqual(["javascript", "html"]);
  });

  test("parses frontmatter - serialize result - with type", async () => {
    type Frontmatter = {
      hello: string;
    };

    const source = dedent(`
      ---
      hello: world
      ---
      # Hello
    `);

    const mdxSource = await serialize<Frontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      },
    });

    if ("error" in mdxSource) throw mdxSource.error;

    // Validating type correctness here, this should not error
    expect(<MDXClient {...mdxSource} />).toBeTruthy();

    expect(mdxSource.frontmatter.hello).toEqual("world");
  });

  // ******************************************
  test("parses frontmatter - rendered result", async () => {
    const source = dedent(`
      ---
      hello: world
      ---
      Hi {frontmatter.hello}
    `);

    const result = await renderStatic({
      source,
      options: {
        parseFrontmatter: true,
      },
    });

    expect(result).toMatchInlineSnapshot(`"<p>Hi world</p>"`);
  });

  // ******************************************
  test("prints helpful message from compile error", async () => {
    try {
      await serialize({ source: "This is very bad <GITHUB_USER>" });
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`
        [Error: [next-mdx-remote] error compiling MDX:
        Expected a closing tag for \`<GITHUB_USER>\` (1:18-1:31) before the end of \`paragraph\`
        
        > 1 | This is very bad <GITHUB_USER>
            |                  ^
        
        More information: https://mdxjs.com/docs/troubleshooting-mdx]
      `);
    }
  });

  // ******************************************
  test("provides internal error handling mechanism", async () => {
    const mdxSource = await serialize({
      source: "This is very bad <GITHUB_USER>",
    });

    if (!("error" in mdxSource)) throw new Error("should have a syntax error");

    expect(mdxSource).toHaveProperty("error");

    expect(mdxSource.error.message).toMatchInlineSnapshot(`
      "[next-mdx-remote-client] error compiling MDX:
      Expected a closing tag for \`<GITHUB_USER>\` (1:18-1:31) before the end of \`paragraph\`

      > 1 | This is very bad <GITHUB_USER>
          |                  ^

      More information: https://mdxjs.com/docs/troubleshooting-mdx"
    `);
  });

  // ******************************************
  test("supports VFile", async () => {
    const result = await renderStatic({ source: new VFile("foo **bar**") });

    expect(result).toMatchInlineSnapshot(`"<p>foo <strong>bar</strong></p>"`);
  });

  // ******************************************
  test("supports Buffer", async () => {
    const result = await renderStatic({ source: Buffer.from("foo **bar**") });

    expect(result).toMatchInlineSnapshot(`"<p>foo <strong>bar</strong></p>"`);
  });

  // ******************************************
  test("infers the type of the frontmatter", async () => {
    const source = dedent(`
      ---
      title: The Title
      ---
      # Hello
    `);

    type Frontmatter = {
      title: string;
    };

    const mdxSource = await serialize<Frontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      },
    });

    if ("error" in mdxSource) throw mdxSource.error;

    expect(mdxSource.frontmatter).toHaveProperty("title");
    expect(mdxSource.frontmatter).toEqual({ title: "The Title" });
  });
});
