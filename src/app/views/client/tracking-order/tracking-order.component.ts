import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderModel } from 'src/app/models/checkout.model';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { ApiCheckoutService } from 'src/app/services/api-checkout.service';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ConfirmDialogComponent } from '../../common_elements/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
})
export class TrackingOrderComponent implements OnInit {
  anotherId;
  Order: OrderModel;
  address: string;
  ward: string;
  district: string;
  province: string;
  totalPrice: number;
  tempPrice: number;
  deliveryPrice: number;

  columnItems = ['index', 'name', 'size', 'quantity', 'price'];
  itemsList = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiCheckoutService: ApiCheckoutService,
    private apiAddressService: ApiAddressService,
    private apiIndexService: ApiIndexService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.getOrderById(id);
  }

  getOrderById(id) {
    this.apiCheckoutService.apiTrackingOrderGet(id).subscribe((res) => {
      this.Order = res.msg;
      this.address = res.msg.address;
      this.tempPrice = res.msg.amount;
      this.deliveryPrice = res.msg.feeShip;
      this.getProvinceById(res.msg.province);
      this.getDistrictById(res.msg.district, res.msg.province);
      this.getWardById(res.msg.ward, res.msg.district);
      res.msg.orderData.forEach((element) => {
        this.getItemById(element.idItem, element.idSize, element.quantity);
      });
    });
  }

  getProvinceById(id) {
    this.apiAddressService.apiProvinceByIdGet(id).subscribe((res) => {
      if (res.code === 200) {
        this.province = res.data.ProvinceName;
      }
    });
  }
  getDistrictById(id, idProvince) {
    this.apiAddressService
      .apiDistrictByIdGet(id, idProvince)
      .subscribe((res) => {
        if (res.code === 200) {
          this.district = res.data.DistrictName;
        }
      });
  }
  getWardById(code, idDistrict) {
    this.apiAddressService.apiWardByIdGet(code, idDistrict).subscribe((res) => {
      if (res.code === 200) {
        this.ward = res.data.WardName;
      }
    });
  }

  getItemById(id, idSize, quantity) {
    this.apiIndexService.apiProductDetailGet(id).subscribe((res) => {
      if (res.code === 200) {
        const name = res.msg.name;
        const price = res.msg.price;
        const size = res.msg.properties.find((item) => {
          return item._id === idSize;
        }).size;

        const obj = {
          name: name,
          size: size,
          quantity: quantity,
          price: price,
        };

        this.itemsList = [...this.itemsList, obj];
      }
    });
  }

  findAnotherOrder() {
    this.getOrderById(this.anotherId);
  }

  cancelOrder() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        content:
          'Are you sure to cancel this order. All problems will be your responsibility',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelOrderById(this.Order._id);
      }
    });
  }

  cancelOrderById(id) {
    this.apiCheckoutService.apiCancelOrderPost(id).subscribe((res) => {
      if (res.code === 200) {
        this.toastr.success(res.msg, 'Successful');
        this.getOrderById(id);
      } else {
        this.toastr.error('Please reload this page (F5)', 'Error Unexpected');
      }
    });
  }
}
