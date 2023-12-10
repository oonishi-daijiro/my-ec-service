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

export function getThumbnailPath(id: number): string { return "" };
export function getProducts(): Product[] { return [] };

