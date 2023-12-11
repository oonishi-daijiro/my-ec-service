import type { NextApiRequest, NextApiResponse } from "next";
import stock from "./stock.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  stock.stock[0].stock--;
  res.status(200).send("");
}
