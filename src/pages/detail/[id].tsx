import { Header } from "../index";
import React, { useState } from "react";
import styles from "@/styles/style.module.css";
import { Product, defaultProduct, getThumbnailPicturePath, orderProduct } from "../../product"
import { sAllProducts } from "../index";
import { useRouter } from "next/router";

export default function Detail() {

   return (
      <div id={styles.pageWrapper}>
         <Header />
         <DetailDisplayWithBoud />
      </div>
   )
}
const DetailDisplayWithBoud: React.FC = () => {
   return (
      <React.Suspense fallback={<DetailFallBack />}>
         <DetailDisplay />
      </React.Suspense>
   )
}

const DetailDisplay: React.FC = () => {
   const allProducts = sAllProducts.read();
   const router = useRouter();
   const id = router.query.id ?? -1;
   const product = (allProducts.find(e => e.id === Number(id))) ?? defaultProduct;
   const [stock, setStock] = React.useState(product.stock);
   const isAvailableToOrder = stock > 0;
   const [shouldStartAnimate, setShouldStartAnimate] = useState(false);

   return (
      <>
         <div id={styles.detailWrapper} className={shouldStartAnimate ? styles.fadeOutToLeft : ""}>
            <ProductPicture {...product} />
            <div id={styles.detailContentWrapper}>
               <div id={styles.detailDisplayName} className={styles.notoSans}>{product.name}</div>
               <div id={styles.detailDisplayPrice} className={styles.notoSans}>￥{product.price}円(税抜)</div>
               <div id={styles.detailDisplayStock} className={styles.notoSans}>在庫:{stock}個</div>
               <div id={styles.descriptionPrefix} className={styles.notoSans}>・商品の詳細</div>
               <div id={styles.detailDisplayDescription} className={styles.notoSans}>{product.description}</div>
               <div id={styles.buttonOrder} className={styles.notoSans} style={{ backgroundColor: isAvailableToOrder ? '#FF2929' : '#FF9999', cursor: isAvailableToOrder ? 'pointer' : 'auto' }}
                  onClick={async () => {
                     if (isAvailableToOrder) {
                        setStock(stock - 1);
                        await handleOrderProduct(product.id)
                        await new Promise<void>((_) => setTimeout(() => _(), 500));
                        setShouldStartAnimate(true);
                        await new Promise<void>((_) => setTimeout(() => _(), 500));
                        router.push(`/gratitude/${product.id}`)
                     }
                  }}>{isAvailableToOrder ? "購入" : "在庫切れ"}</div>
            </div>
         </div >

      </>
   )
}

async function handleOrderProduct(id: number) {
   return orderProduct(id, 1);
}

const DetailFallBack: React.FC = () => {
   return <>ロード中</>
}

const ProductPicture: React.FC<Product> = (props) => {
   return <img src={getThumbnailPicturePath(props.id)} id={styles.detailDisplayPicture}></img>
}
