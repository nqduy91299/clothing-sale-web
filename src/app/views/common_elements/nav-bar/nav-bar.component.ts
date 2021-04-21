import { Component, OnInit } from '@angular/core';
import { ReadQuantityItemService } from 'src/app/services/read-quantity-item.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  totalItem = 0;
  constructor(private readQuantityItemService: ReadQuantityItemService) {}

  searchBarStatus = false;

  ngOnInit(): void {
    this.getCart();
    this.listenAddCart();
  }

  listenAddCart() {
    this.readQuantityItemService.subscriber$.subscribe((data) => {
      if (data) {
        this.getCart();
      }
    });
  }

  getCart() {
    let currentCart = localStorage.getItem('cart');
    let cart = JSON.parse(currentCart);
    this.totalItem = cart.length;
  }

  changeStatusSearch() {
    this.searchBarStatus = !this.searchBarStatus;
  }
}
