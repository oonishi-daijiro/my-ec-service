import { Html, Main, Head, NextScript } from 'next/document'
import { useRouter } from 'next/router'

export default function Document() {

  return (
    <Html lang="ja">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700;900&display=swap" rel="stylesheet" />
      <link href="https://use.fontawesome.com/releases/v6.2.0/css/all.css" rel="stylesheet" />
      <body style={{ margin: 0 }}>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
