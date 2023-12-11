import stock from "./stock.json";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest,res:NextApiResponse){
   console.log('get all products');
   
   res.status(200).json(stock)
}
