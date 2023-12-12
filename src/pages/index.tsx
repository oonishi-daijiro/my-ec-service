import React from "react";
import { Product, defaultProduct, getAllProducts, getThumbnailPicturePath } from "../product";
import Next, { useRouter } from "next/router";
import '@/styles/style.module.css';
import styles from '@/styles/style.module.css';



class SuspenseResource<T> {
  constructor(resourceFetcher: () => Promise<T>, defaultData: T) {
    this.resouseFetcher = resourceFetcher
    this.data = defaultData
    this.setFetcher()
  }
  read(): T {
    switch (this.stat) {
      case 'pending':
        throw this.promise
      case 'fullfilled':
        return this.data
      case 'rejected':
        return this.data
    }
  }

  reload(): void {
    this.stat = 'pending'
    this.setFetcher()
  }

  private setFetcher() {
    this.promise = this.resouseFetcher().then(data => {
      this.data = data
      this.stat = 'fullfilled'
    }).catch(() => {
      this.stat = 'rejected'
    })
  }

  private stat: 'pending' | 'fullfilled' | 'rejected' = 'pending'
  private data: T
  private resouseFetcher: () => Promise<T>
  private promise: Promise<void>

}


export const sAllProducts = new SuspenseResource<Product[]>(getAllProducts, [defaultProduct]);

export default function Index() {
  return (
    <div id={styles.pageWrapper}>
      <Header />
      <React.Suspense fallback={<Fallback />}>
        <ResultWithBound filterFunc={() => true} />
      </React.Suspense>
    </div>
  );
}

const Fallback: React.FC = () => {
  return <div id={styles.fallbacl}>ロード中</div>
}


export const Header: React.FC = () => {
  return (
    <div id={styles.header}>
      <Logo />
      <Search />
      <WebSiteDescription />
    </div>
  );
}

export const ResultWithBound: React.FC<{ filterFunc: (p: Product) => boolean }> = (props) => { // this component is suspense
  return (
    <React.Suspense fallback={<>ロード中</>}>
      <Result {...props} />
    </React.Suspense>
  )
}

const Result: React.FC<{ filterFunc: (p: Product) => boolean }> = (props) => {
  const allProducts = sAllProducts.read();
  const filteredProducts = allProducts.filter(props.filterFunc);
  if (filteredProducts.length === 0) {
    return (
      <div id={styles.noResult} className={styles.notoSans}>
        <FontAwesomeIcon name="noFound" id={styles.iconNoFound}></FontAwesomeIcon>
        一致する商品は見つかりませんでした
      </div>
    )
  }
  return <div id={styles.resultWrapper}>{filteredProducts.map((e, index) => <ProductThumbnail {...e} key={index} />)}</div>
}

const ProductThumbnail: React.FC<Product & { key: number }> = (props) => {
  const router = useRouter();
  return (
    <div className={styles.productThumbnail} onClick={() => router.push(`/detail/${props.id}`)}>
      <ProductThmubnailPicture {...props} />
      <div className={styles.productPrice}>{`￥${props.price}`}</div>
      <div className={styles.productName}>{props.name}</div>
    </div>
  )
}

const ProductThmubnailPicture: React.FC<Product> = (props) => {

  return <>
    <img className={styles.productThmubnailPicture} src={getThumbnailPicturePath(props.id)}></img>
  </>
}

const WebSiteDescription: React.FC = () => {
  return (
    <div suppressHydrationWarning={true} id={styles.webSiteDescription}>※このサイトは授業の課題で作成したサイトです．サイト内の商品は一切購入することができません．</div>
  )
};

const Logo: React.FC = () => {
  const router = useRouter();
  return <div draggable="false" id={styles.logoWrapper}><img src="/logo.svg" id={styles.logo} onClick={() => router.push('/')} /></div>
}

const Search: React.FC = () => {
  const [textInput, editableTextInput] = useEditableTextInput({ value: "", placeholder: "商品を検索", id: styles.search });
  const router = useRouter();
  return (
    <div id={styles.searchWrapper} className={styles.noDefaultStyle}>
      <form id={styles.formSearch}
        onSubmit={e => {
          e.preventDefault()
          if (textInput !== "") router.push(`/search/${textInput}`);
        }
        }>
        <>{editableTextInput}</>
      </form>
      <FontAwesomeIcon name="search" id={styles.searchIcon} />
    </div>
  );
}

const Icons = {
  search: "fa-solid fa-magnifying-glass",
  noFound: "fa-solid fa-circle-exclamation"
} as const;

const FontAwesomeIcon: React.FC<{ name: keyof typeof Icons } & React.ComponentProps<'i'>> = (props) => {
  return <i {...props} className={`${props.className ?? ""} ${Icons[props.name]}`}></i>
}

function useEditableTextInput(props: React.ComponentProps<'input'> = {}): [React.ComponentProps<'input'>['value'], React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>] {
  const [textInput, setTextInput] = React.useState(props.value ?? "");
  return [textInput, <input {...props} value={textInput ?? ""} onChange={e => { setTextInput(e.target.value); (props.onChange ?? ((e) => { }))(e) }} />];
}
