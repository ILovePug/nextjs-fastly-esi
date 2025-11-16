import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* The header will be populated by ESI at the edge (Varnish) */}
          <header id="global-header" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

