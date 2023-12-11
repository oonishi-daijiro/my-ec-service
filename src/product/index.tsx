export interface Product {
   name: string
   id: number
   description: string
   price: number
   stock: number
}

export const defaultProduct: Product = {
   name: "",
   id: 0,
   description: "",
   price: 0,
   stock: 0
}

export const Products: Product[] = [defaultProduct];

import product from "./products.json";

export async function getAllProducts(): Promise<Product[]> {
   return product.AllProducts;
};

export async function orderProduct(id: number, stockCount: number): Promise<void> {
   product.AllProducts.find(e => e.id === id).stock -= stockCount;
}

export function getThumbnailPath(id: number): string { return "" };
