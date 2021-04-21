import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from '../../common_elements/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total = 0;
  host = environment.hostImage;
  itemsList = [];
  columnItems = ['item', 'size', 'quantity', 'price'];
  constructor(private toastr: ToastrService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    const currentCart = localStorage.getItem('cart');
    this.itemsList = JSON.parse(currentCart);
    this.updateTotal(this.itemsList);
  }

  updateTotal(list) {
    this.total = 0;
    console.log(list.length <= 0);
    if (list.length <= 0) {
      this.total = 0;
    } else {
      list.forEach((item) => {
        console.log(item);
        this.total += item.price * item.quantity;
      });
    }
  }

  subQuantity(i) {
    if (this.itemsList[i].quantity > 1) {
      this.itemsList[i].quantity -= 1;
    }
    this.updateTotal(this.itemsList);
  }
  addQuantity(i) {
    this.itemsList[i].quantity += 1;
    this.updateTotal(this.itemsList);
  }
  update() {
    localStorage.setItem('cart', JSON.stringify(this.itemsList));
    this.toastr.success('Update successfully', 'Successful');
  }

  removeItem(id) {
    this.itemsList = this.itemsList.filter((item) => {
      return item.id !== id;
    });
    this.updateTotal(this.itemsList);
  }

  clear() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        content: 'Are you sure to CLEAR all your cart?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.itemsList = [];
        localStorage.setItem('cart', JSON.stringify(this.itemsList));
        this.updateTotal(this.itemsList);

        this.toastr.success('Update successfully', 'Successful');
      }
    });
  }
}
