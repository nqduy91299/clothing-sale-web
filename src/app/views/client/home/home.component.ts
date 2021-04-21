import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/checkout.model';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ReadQuantityItemService } from 'src/app/services/read-quantity-item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  options = optionsRangeSlider();
  minValue: number = 0;
  maxValue: number = 1000;

  typesOfShoes: string[] = [
    'Jeans',
    'Trousers',
    'Jogger',
    'Tee',
    'Shirt',
    'Polo',
  ];
  sortValue = 0;
  productsList: ProductModel[] = [];
  ENVIRONMENT = environment;

  totalOrders;
  pageIndex = 1;
  pageSize = 12;

  constructor(
    private apiIndexService: ApiIndexService,
    private toastr: ToastrService,
    private readQuantityItemService: ReadQuantityItemService
  ) {}
  ngOnInit(): void {
    this.initCart();
    this.getProducts();
  }
  initCart() {
    if (!localStorage.getItem('cart')) {
      const cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  getProducts() {
    this.apiIndexService
      .apiProductsGet(this.pageIndex, this.pageSize)
      .subscribe((res) => {
        if (res.code === 200) {
          this.productsList = [...res.msg];
          this.totalOrders = res.total;
        }
      });
  }
  addToCart(event) {
    let currentCart = localStorage.getItem('cart');
    let newCart: any[] = JSON.parse(currentCart);
    let indexDup;
    let dup = newCart.find((item, index) => {
      indexDup = index;
      return item.sizeId === event.sizeId;
    });

    if (!dup) {
      const size = event.item.properties.find((item) => {
        return item._id === event.sizeId;
      }).size;

      const item = {
        id: event.item._id,
        name: event.item.name,
        price: event.item.price,
        mainImage: event.item.imageMain,
        size: size,
        sizeId: event.sizeId,
        quantity: 1,
      };
      newCart = [...newCart, item];
    } else {
      dup.quantity = dup.quantity + 1;
      newCart.splice(indexDup, 1, dup);
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    this.toastr.success('Add item to cart', 'Successful');
    this.readQuantityItemService.emitData(true);
  }

  paginatorChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getProducts();
  }
}

export function optionsRangeSlider(): Options {
  const options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '$' + value;
      }
    },
  };
  return options;
}
