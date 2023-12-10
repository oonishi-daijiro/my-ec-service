import { useRouter } from "next/router";
import { Products } from "../../product";

export default function Search() {
   const router = useRouter();
   const { word } = router.query;
   return <>{word}</>
}
