import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ApiManageProductService } from 'src/app/services/api-manage-product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  product: ProductModel;
  imgMain;
  host = environment.hostImage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiIndexService: ApiIndexService
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.getProductById(id);
  }

  getProductById(id) {
    this.apiIndexService.apiProductDetailGet(id).subscribe((res) => {
      if (res.code === 200) {
        this.product = res.msg;
        this.imgMain = environment.hostImage + res.msg.imageMain;
      }
    });
  }
}
