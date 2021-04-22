import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderModel } from 'src/app/models';
import { ApiManageOrderService } from 'src/app/services/api-manage-order.service';
import { ConfirmDialogComponent } from '../../common_elements/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  Orders: OrderModel[] = [];
  allOrders: OrderModel[] = [];
  confirmOrders: OrderModel[] = [];
  tickets: OrderModel[] = [];

  badgeConfirmedOrder = 0;
  badgeNeededConfirmOrder = 0;
  badgeTicket = 0;
  constructor(
    private apiManageOrderService: ApiManageOrderService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
    this.getOrdersNeedConfirm();
    this.getConfirmedOrder();
    this.getTicket();
  }

  getAllOrders() {
    this.apiManageOrderService.apiAllOrdersGet().subscribe((res) => {
      if (res.code === 200) {
        this.allOrders = res.msg;
      }
    });
  }

  getTicket() {
    this.apiManageOrderService.apiAllOrdersGet().subscribe((res) => {
      if (res.code === 200) {
        const data = res.msg.filter((item) => {
          return item.status === 2;
        });
        this.tickets = [...data];
        this.badgeTicket = this.tickets.length;
      }
    });
  }

  getConfirmedOrder() {
    this.apiManageOrderService.apiAllOrdersGet().subscribe((res) => {
      if (res.code === 200) {
        const data = res.msg.filter((item) => {
          return item.status === 1;
        });
        this.confirmOrders = [...data];
        this.badgeConfirmedOrder = this.confirmOrders.length;
      }
    });
  }

  getOrdersNeedConfirm() {
    this.apiManageOrderService.apiOrdersNeedConfirmGet().subscribe((res) => {
      this.Orders = res;
      this.badgeNeededConfirmOrder = this.Orders.length;
    });
  }
  createTicket(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        content:
          'Are you sure to create ticket for this order? (Shipping this order)',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        try {
          this.apiManageOrderService
            .apiCreateTicketPost(id)
            .subscribe((res) => {
              if (res.code === 200) {
                this.toastr.success(res.msg, 'Successful');
                this.getConfirmedOrder();
                this.getTicket();
              } else {
                this.toastr.error(res.msg, 'Error unexpected');
              }
            });
        } catch (error) {
          this.toastr.error('res.msg', 'Error unexpected');
        }
      }
    });
  }

  confirmOrder(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { content: 'Are you sure to confirm this order?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiManageOrderService.apiConfirmOrderPost(id).subscribe((res) => {
          if (res.code === 200) {
            this.toastr.success(res.msg, 'Successful');
            this.getOrdersNeedConfirm();
            this.getConfirmedOrder();
          } else {
            this.toastr.success(res.msg, 'Error unexpected');
          }
        });
      }
    });
  }

  deleteTicket(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { content: 'Are you sure to delete this ticket?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiManageOrderService.apiDeleteTicketPost(id).subscribe((res) => {
          if (res.code === 200) {
            this.toastr.success(res.msg, 'Successful');
            this.getTicket();
            this.getAllOrders();
          } else {
            this.toastr.success(res.msg, 'Error unexpected');
          }
        });
      }
    });
  }
}
