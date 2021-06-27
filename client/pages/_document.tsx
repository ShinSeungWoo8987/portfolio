import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    // ServerStyleSheet instance를 생성한다.
    const sheet = new ServerStyleSheet();
    // Page에 있는 컴포넌트에서 style을 검색한다.
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        // page의 컴포넌트에 적용된 스타일을 검색한다.
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
