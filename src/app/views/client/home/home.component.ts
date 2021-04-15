import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/index.model';
import { ApiIndexService } from 'src/app/services/api-index.service';
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

  constructor(private apiIndexService: ApiIndexService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiIndexService.apiProductsGet().subscribe((res) => {
      // console.log(res);
      this.productsList = [...res];
    });
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
