export interface ProductModel {
  _id: string;
  category: number;
  description: string;
  imageArray: string[];
  imageMain: string;
  name: string;
  price: number;
  properties: SizeModel[];
}

export interface SizeModel {
  _id: string;
  size: string;
  quantity: number;
}
