export interface resProvinceModel {
  code: number;
  message: string;
  data: ProvinceModel[] | null;
}
export interface resDistrictModel {
  code: number;
  message: string;
  data: DistrictModel[] | null;
}
export interface resWardModel {
  code: number;
  message: string;
  data: WardModel[] | null;
}

export interface ProvinceModel {
  CountryID: number;
  ProvinceID: number;
  ProvinceName: string;
  Code: string;
}
export interface DistrictModel {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
}

export interface WardModel {
  WardCode: number;
  DistrictID: number;
  WardName: string;
}
