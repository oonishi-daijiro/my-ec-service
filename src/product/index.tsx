type UUID = string;


export interface Product {
   name: string
   id: UUID
   description: string
   price: number
   stock: number
   keywords: string[]
}

export const defaultProduct: Product = {
   name: "",
   id: "",
   description: "",
   price: 0,
   stock: 0,
   keywords: []
}

export const Products: Product[] = [defaultProduct];

import product from "./products.json";

export async function getAllProducts(): Promise<Product[]> {
   return product.AllProducts ?? [];
};

export async function orderProduct(id: UUID, stockCount: number): Promise<void> {

   const productIndex = product.AllProducts.findIndex(e => e.id === id);
   product.AllProducts[productIndex].stock -= stockCount;
   return;
}

export function getThumbnailPicturePath(id: UUID): string {
   return `/products-picture/${id}.png`;
};
