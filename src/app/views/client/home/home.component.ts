import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

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

  constructor() {}
  ngOnInit(): void {}
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
