import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from 'src/app/models';
import { ApiCheckoutService } from 'src/app/services/api-checkout.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  phone: string | number | string[];
  Orders: OrderModel[] = [];
  constructor(
    private apiCheckoutService: ApiCheckoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params?.phone != undefined) {
      this.phone = this.activatedRoute.snapshot.params?.phone;
      this.getOrdersByPhone(this.phone);
    }
  }

  search() {
    this.getOrdersByPhone(this.phone);
  }
  getOrdersByPhone(phone) {
    if (location.pathname === '/order-management') {
      this.router.navigate([`/order-management/${phone}`]);
    } else {
      this.apiCheckoutService.apiOrderByPhoneGet(phone).subscribe((res) => {
        if (res.code === 200) {
          this.Orders = res.msg;
        }
      });
    }
  }
}
