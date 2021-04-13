import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  itemsList = [
    { name: 'item 1', size: 12, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 2', size: 13, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 3', size: 12, quantity: 1, price: '$ ' + 2010112 },
    { name: 'item 4', size: 15, quantity: 1, price: '$ ' + 2010112 },
  ];
  columnItems = ['item', 'size', 'quantity', 'price'];
  constructor() {}

  ngOnInit(): void {}

  subQuantity(i) {
    if (this.itemsList[i].quantity > 0) {
      this.itemsList[i].quantity -= 1;
    }
  }
  addQuantity(i) {
    this.itemsList[i].quantity += 1;
  }
}
