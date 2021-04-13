import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DistrictModel,
  ProvinceModel,
  WardModel,
} from 'src/app/models/ghn.model';
import { ApiGhnService } from 'src/app/services/api-ghn.service';

export enum PAYMENT {
  COD,
  BANK,
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  columnItems = ['name', 'size', 'quantity', 'price'];
  collapse = true;
  PAYMENT = PAYMENT;

  provincesList: ProvinceModel[] = [];
  districtsList: DistrictModel[] = [];
  wardsList: WardModel[] = [];

  deliveryFrm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    province: new FormControl(null, Validators.required),
    district: new FormControl(null, Validators.required),
    ward: new FormControl(null, Validators.required),
    payment: new FormControl(PAYMENT.COD),
    discount: new FormControl(),
  });

  itemsList = [
    { name: 'item 1', size: 12, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 2', size: 13, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 3', size: 12, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 4', size: 15, quantity: 1, price: '$ ' + 2010112 },
  ];

  constructor(private ghnApi: ApiGhnService) {}

  ngOnInit(): void {
    this.getProvince();
  }

  getProvince() {
    this.districtsList = [];
    this.wardsList = [];
    this.deliveryFrm.patchValue({
      district: null,
      ward: null,
    });
    this.ghnApi.apiProvinceGet().subscribe((res) => {
      if (res.code === 200) {
        this.provincesList = [...res.data];
      }
    });
  }
  getDistrict(province_id) {
    this.wardsList = [];
    this.deliveryFrm.patchValue({
      ward: null,
    });
    this.ghnApi.apiDistrictGet(province_id).subscribe((res) => {
      if (res.code == 200) {
        this.districtsList = [...res.data];
      }
    });
  }
  getWard(district_id) {
    this.ghnApi.apiWardGet(district_id).subscribe((res) => {
      if (res.code == 200) {
        this.wardsList = [...res.data];
      }
    });
  }
  provinceValueChange(value) {
    this.getDistrict(value);
  }
  districtValueChange(value) {
    this.getWard(value);
  }

  clickCollapse() {
    this.collapse = !this.collapse;
  }
  currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
