import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  DistrictModel,
  ProvinceModel,
  WardModel,
} from 'src/app/models/ghn.model';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { ApiCheckoutService } from 'src/app/services/api-checkout.service';
import { ApiGhnService } from 'src/app/services/api-ghn.service';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ReadQuantityItemService } from 'src/app/services/read-quantity-item.service';
import {
  minPhoneValidator,
  timeFormatValidator,
} from 'src/app/share/constants/phone-validate';
import { DialogOrderSuccessComponent } from '../../common_elements/modals/dialog-order-success/dialog-order-success.component';

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

  orderFrm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      timeFormatValidator,
      minPhoneValidator(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    address: new FormControl(null, Validators.required),
    nameProvince: new FormControl(null),
    province: new FormControl(null, Validators.required),
    nameDistrict: new FormControl(null),
    district: new FormControl(null, Validators.required),
    nameWard: new FormControl(null),
    ward: new FormControl(null, Validators.required),
    payment: new FormControl(PAYMENT.COD),
    discount: new FormControl(),
  });

  itemsList = [];
  tempPrice = 0;
  totalPrice = 0;
  deliveryPrice = 0;
  nameAddress = ['', '', ''];

  usingCart = false;

  constructor(
    private ghnApi: ApiGhnService,
    private activatedRoute: ActivatedRoute,
    private apiIndexService: ApiIndexService,
    private apiCheckoutService: ApiCheckoutService,
    public dialog: MatDialog,
    public router: Router,
    private toastr: ToastrService,
    private apiAddressService: ApiAddressService,
    private readQuantityItemService: ReadQuantityItemService
  ) {}

  ngOnInit(): void {
    this.getProvince();
    const { id, size_id, quantity } = this.activatedRoute.snapshot.params;
    if (!id) {
      this.usingCart = true;
      this.getCart();
    } else {
      this.getItem(id, size_id, quantity);
    }
  }

  getCart() {
    let currentCart = localStorage.getItem('cart');
    let cart = JSON.parse(currentCart);
    for (let i = 0; i < cart.length; i++) {
      this.getItem(cart[i].id, cart[i].sizeId, cart[i].quantity);
    }
  }

  purchase() {
    const controls = this.orderFrm.controls;
    if (this.orderFrm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.apiCheckoutService
      .apiCheckoutOrderPost(this.orderFrm.value, this.itemsList)
      .subscribe((res) => {
        if (res.code === 200) {
          const idOrder = res.data._id;
          if (this.usingCart) {
            this.deleteCart();
          }
          this.navigateUrlToTrackingOrder(idOrder);
        } else {
          this.toastr.error('Please this reload page (F5)', 'Error Unexpected');
        }
      });
  }

  deleteCart() {
    let item = [];
    localStorage.setItem('cart', JSON.stringify(item));
    this.readQuantityItemService.emitData(true);
  }

  navigateUrlToTrackingOrder(idOrder) {
    this.openDialog()
      .afterClosed()
      .subscribe(() => {
        this.router.navigate([`order-management/tracking-order/${idOrder}`]);
      });
  }

  openDialog() {
    return this.dialog.open(DialogOrderSuccessComponent);
  }

  getItem(item_id, size_id, quantity) {
    this.apiIndexService.apiProductDetailGet(item_id).subscribe((res) => {
      const { name, price, properties } = res.msg;
      const size = properties.find((item) => {
        return item._id == size_id;
      }).size;
      const newPrice = parseInt(quantity) * price;

      const item = {
        idItem: item_id,
        nameItem: name,
        nameSize: size,
        priceItem: newPrice,
        quantity: quantity,
        idSize: size_id,
      };
      this.tempPrice += newPrice;
      this.itemsList = [...this.itemsList, item];
      this.updateTotalPrice();
    });
  }

  getProvince() {
    this.districtsList = [];
    this.wardsList = [];
    this.orderFrm.patchValue({
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
    const nameProvince = this.provincesList.find((item) => {
      return item.ProvinceID === province_id;
    }).ProvinceName;

    this.orderFrm.patchValue({
      district: null,
      ward: null,
      nameProvince: nameProvince,
    });
    this.ghnApi.apiDistrictGet(province_id).subscribe((res) => {
      if (res.code == 200) {
        this.districtsList = [...res.data];
      }
    });
  }
  getWard(district_id) {
    const nameDistrict = this.districtsList.find((item) => {
      return item.DistrictID === district_id;
    }).DistrictName;

    this.orderFrm.patchValue({
      ward: null,
      nameDistrict: nameDistrict,
    });
    this.ghnApi.apiWardGet(district_id).subscribe((res) => {
      if (res.code == 200) {
        this.wardsList = [...res.data];
      }
    });
  }
  provinceValueChange(value) {
    this.getDistrict(value);
    this.deliveryPrice = 0;
  }
  districtValueChange(value) {
    this.getWard(value);
    this.deliveryPrice = 0;
  }
  wardValueChange(ward_code) {
    const nameWard = this.wardsList.find((item) => {
      return item.WardCode === ward_code;
    }).WardName;
    this.orderFrm.patchValue({
      nameWard: nameWard,
    });
    this.apiCheckoutService
      .apiCalculateFeeDeliveryPost(this.orderFrm.value.district)
      .subscribe((res) => {
        if (res.code === 200) {
          this.deliveryPrice = res.data.total;
          this.updateTotalPrice();
          this.toastr.success(res.msg, 'Successful', {
            timeOut: 1000,
          });
        }
      });
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

  getProvinceById(id) {
    this.apiAddressService.apiProvinceByIdGet(id).subscribe(async (res) => {
      if (res.code === 200) {
        return await res.data.ProvinceName;
      }
    });
  }
  getDistrictById(id, idProvince) {
    this.apiAddressService
      .apiDistrictByIdGet(id, idProvince)
      .subscribe(async (res) => {
        if (res.code === 200) {
          return await res.data.DistrictName;
        }
      });
  }
  getWardById(code, idDistrict) {
    this.apiAddressService
      .apiWardByIdGet(code, idDistrict)
      .subscribe(async (res) => {
        if (res.code === 200) {
          return await res.data.WardName;
        }
      });
  }
}
