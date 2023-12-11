import { useRouter } from "next/router";
import { Product, Products } from "../../product";
import { Result, Header } from "../index";


export default function Search() {
   const router = useRouter();
   const word = router.query.word ?? "";
   const filterFunc = (p: Product): boolean => {
      const condition: boolean[] = [
         p.name.includes(word.toString()),
         p.description.includes(word.toString())
      ]
      return condition.reduce((previous, current) => (previous && current));
   }
   return (
      <>
         <Header />
         <>{`"${word}"の検索結果`}</>
         <Result filterFunc={filterFunc} />

      </>
   )
}
