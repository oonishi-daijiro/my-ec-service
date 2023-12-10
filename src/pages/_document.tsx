import { Html, Main, Head, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="ja">
      <Head />
      <link href="stylesheet" rel="../styles/style.module.css"></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
