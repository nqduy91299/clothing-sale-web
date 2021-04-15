import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DistrictModel,
  ProvinceModel,
  WardModel,
} from 'src/app/models/ghn.model';
import { SizeModel } from 'src/app/models/index.model';
import { ApiCheckoutService } from 'src/app/services/api-checkout.service';
import { ApiGhnService } from 'src/app/services/api-ghn.service';
import { ApiIndexService } from 'src/app/services/api-index.service';

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

  itemsList = [];
  tempPrice = 0;
  totalPrice = 0;
  deliveryPrice = 0;

  constructor(
    private ghnApi: ApiGhnService,
    private activatedRoute: ActivatedRoute,
    private apiIndexService: ApiIndexService,
    private apiCheckoutService: ApiCheckoutService
  ) {}

  ngOnInit(): void {
    this.getProvince();
    const { id, size_id, quantity } = this.activatedRoute.snapshot.params;
    console.log(id, size_id, quantity);
    this.getItems(id, size_id, quantity);
  }

  purchase() {
    const controls = this.deliveryFrm.controls;
    if (this.deliveryFrm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    } else {
      console.log(this.deliveryFrm.value);
      this.apiCheckoutService.apiCheckoutOrderPost(
        this.deliveryFrm.value,
        this.itemsList
      );
    }
  }

  getItems(item_id, size_id, quantity) {
    this.apiIndexService.apiProductDetailGet(item_id).subscribe((res) => {
      const { name, price, properties } = res;
      const size = properties.find((item) => {
        return item._id == size_id;
      });
      const newPrice = parseInt(quantity) * price;
      const item = {
        id: item_id,
        name: name,
        data: size,
        price: newPrice,
        quantity: quantity,
      };
      this.tempPrice = newPrice;
      this.itemsList = [...this.itemsList, item];
      this.updateTotalPrice();
    });
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

  updateTotalPrice() {
    this.totalPrice = this.tempPrice + this.deliveryPrice;
  }
}
