import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ApiManageProductService } from 'src/app/services/api-manage-product.service';
import { ConfirmDialogComponent } from '../../common_elements/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  displayedColumns = [
    'index',
    'name',
    'price',
    'description',
    'category',
    'items',
    'action',
  ];
  totalOrders;
  pageIndex = 1;
  pageSize = 5;
  productsList: ProductModel[] = [];
  constructor(
    private apiIndexService: ApiIndexService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private apiManageProductService: ApiManageProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiIndexService
      .apiProductsGet(this.pageIndex, this.pageSize)
      .subscribe((res) => {
        if (res.code === 200) {
          this.productsList = res.msg;
          this.totalOrders = res.total;
        }
      });
  }

  paginatorChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getAllProducts();
  }

  deleteProduct(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        content: 'Are you sure to delete this product',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiManageProductService
          .apiDeleteProductPost(id)
          .subscribe((res) => {
            if (res.code === 200) {
              this.toastr.success(res.msg, 'Successful');
              this.getAllProducts();
            } else {
              this.toastr.error(res.msg, 'Error Unexpected');
            }
          });
      }
    });
  }
}
