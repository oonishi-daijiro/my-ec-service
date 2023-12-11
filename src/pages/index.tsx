import React from "react";
import { Product, defaultProduct, getAllProducts } from "../product";
import { useRouter } from "next/router";
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

  reLoad(): void {
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


const sAllProducts = new SuspenseResource<Product[]>(getAllProducts, [defaultProduct]);

export default function Index() {
  return (
    <>
      <Header />
      <React.Suspense fallback={<>ロード中</>}>
        <Result filterFunc={() => true} />
      </React.Suspense>
    </>
  );
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

export const Result: React.FC<{ filterFunc: (p: Product) => boolean }> = (props) => { // this component is suspense
  const allProducts = sAllProducts.read();
  return <div id={styles.resultWrapper}>{allProducts.filter(props.filterFunc).map(e => <ProductThumbnail {...e} />)}</div>
}

const ProductThumbnail: React.FC<Product> = (props) => {
  return <ProductThmubnailPicture {...props} />
}

const ProductThmubnailPicture: React.FC<Product> = (props) => {
  return <>
    <p>{props.name}</p>
    <p>{props.description}</p>
    <p>{props.price}</p>
    <p>{props.stock}</p>
    <p>{props.id}</p>
  </>
}

const WebSiteDescription: React.FC = () => {
  return (
    <div suppressHydrationWarning={true} id={styles.webSiteDescription}>※このサイトは授業の課題で作成したサイトです．サイト内の商品は一切購入することができません．</div>
  )
};

const Logo: React.FC = () => {
  return <div draggable="false" id={styles.logoWrapper}><img src="/logo.svg" id={styles.logo}></img></div>
}

const Search: React.FC = () => {
  const [textInput, editableTextInput] = useEditableTextInput({ value: "", placeholder: "商品を検索", id: styles.search });
  const router = useRouter();
  return (
    <div id={styles.searchWrapper} className={styles.noDefaultStyle}>
      <form id={styles.formSearch}
        onSubmit={e => {
          e.preventDefault()
          router.push(`/search/${textInput}`);
        }
        }>
        <>{editableTextInput}</>
      </form>
      <FontAwesomeIcon name="search" id={styles.searchIcon} />
    </div>
  );
}

const Icons = {
  search: "fa-solid fa-magnifying-glass"
} as const;

const FontAwesomeIcon: React.FC<{ name: keyof typeof Icons } & React.ComponentProps<'i'>> = (props) => {
  return <i {...props} className={`${props.className ?? ""} ${Icons[props.name]}`}></i>
}

function useEditableTextInput(props: React.ComponentProps<'input'> = {}): [React.ComponentProps<'input'>['value'], React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>] {
  const [textInput, setTextInput] = React.useState(props.value ?? "");
  return [textInput, <input {...props} value={textInput ?? ""} onChange={e => { setTextInput(e.target.value); (props.onChange ?? ((e) => { }))(e) }} />];
}
