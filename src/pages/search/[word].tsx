import { useRouter } from "next/router";
import { Product } from "../../product";
import { ResultWithBound, Header } from "../index";
import styles from "@/styles/style.module.css";



export default function Search() {
   const router = useRouter();
   const word = router.query.word ?? "";
   const filterFunc = (p: Product): boolean => {
      const condition: boolean[] = [
         p.name.includes(word.toString()),
         p.description.includes(word.toString()),
         p.keywords.map(e => e === word.toString()).reduce((p, c) => p || c, false)
      ]
      return condition.reduce((previous, current) => (previous || current));
   }

   return (
      <div id={styles.pageWrapper}>
         <Header />
         <div id={styles.searchWordDisplay}>{`” ${word} ”の検索結果`}</div>
         <ResultWithBound filterFunc={filterFunc} />
      </div>
   )
}
