export interface res2pModel<T> {
  code: number;
  msg: T;
}

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

/*
  Space between Model
*/
export interface OrderModel {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nameProvince: string;
  province: string;
  nameDistrict: string;
  district: string;
  nameWard: string;
  ward: string;
  amount: number;
  feeShip: number;
  orderCode: string;
  status: number;
  orderData: ItemOrderModel[];
  createAt: string;
}
export interface ItemOrderModel {
  _id: string;
  idItem: string;
  nameItem: string;
  idSize: string;
  nameSize: string;
  quantity: number;
  priceItem: number;
}

/*
  Space between Model
*/
export interface FeeModel {
  coupon_value: number;
  insurance_fee: number;
  pick_station_fee: number;
  r2s_fee: number;
  service_fee: number;
  total: number;
}

export interface res3pModel<T> {
  code: number;
  msg: string;
  data: T;
}

export interface responsePaginatorModel<T> {
  code: number;
  msg: T;
  total: number;
}
