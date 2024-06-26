import styles from '@/styles/style.module.css';
import { getThumbnailPicturePath } from '../../product';
import { useRouter } from 'next/router';
import { Header } from '..';

export default function Gratitude() {
   const router = useRouter();
   const id = router.query.id ?? "";
   const randomDelivery = Math.floor(10 + (Math.random() * 30));
   const d = new Date();
   d.setMonth(d.getDate() + randomDelivery);

   return (
      <div id={styles.pageWrapper}>
         <Header />
         <div id={styles.gratitudeWrapper} className={styles.fadeInFromRight}>
            <div id={styles.gratituteMessage} className={styles.notoSans} suppressHydrationWarning={true}>ご購入ありがとうございます！</div>
            <img id={styles.gratitudeRoundedThumbnail} src={getThumbnailPicturePath(id.toString())}></img>
            <div id={styles.shipDate} className={styles.notoSans} suppressHydrationWarning={true}>お届け日時:{`${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`}</div>
         </div>
      </div>
   )
}
