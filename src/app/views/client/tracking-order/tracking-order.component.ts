import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
})
export class TrackingOrderComponent implements OnInit {
  columnItems = ['name', 'size', 'quantity', 'price'];
  itemsList = [
    { name: 'item 1', size: 12, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 2', size: 13, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 3', size: 12, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 4', size: 15, quantity: 1, price: '$ ' + 2010112 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
