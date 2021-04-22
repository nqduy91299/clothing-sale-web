import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  NgxGalleryAnimation,
  NgxGalleryImageSize,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/checkout.model';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ReadQuantityItemService } from 'src/app/services/read-quantity-item.service';
import { configSummerNote } from 'src/app/share/constants/config-summnernote';
import { environment } from 'src/environments/environment';

const galleryOption: NgxGalleryOptions[] = [
  {
    breakpoint: 1800,
    preview: true,
    previewArrows: true,
    previewCloseOnEsc: true,
    previewCloseOnClick: true,
    thumbnailsPercent: 15,
    imageSize: NgxGalleryImageSize.Contain,
    thumbnailSize: NgxGalleryImageSize.Contain,
    imageAnimation: NgxGalleryAnimation.Slide,
  },
  // max-width 800
  {
    breakpoint: 800,
    imagePercent: 100,
    thumbnailsPercent: 30,
    thumbnailsMargin: 15,
    thumbnailMargin: 15,
  },
  // max-width 400
  {
    breakpoint: 400,
    preview: false,
  },
];
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = galleryOption;
  galleryImages: NgxGalleryImage[];
  product: ProductModel;
  sizeList = [];
  sizeId;
  itemLeft = 0;
  itemQuantity = 1;
  config = configSummerNote;

  constructor(
    private route: ActivatedRoute,
    private apiIndexService: ApiIndexService,
    public router: Router,
    private toastr: ToastrService,
    private readQuantityItemService: ReadQuantityItemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.getProductDetail(id);
  }

  getProductDetail(id) {
    this.apiIndexService.apiProductDetailGet(id).subscribe((res) => {
      this.product = res.msg;
      this.initSizeList(res.msg.properties);
      this.updateGallery(res.msg.imageMain, res.msg.imageArray);
    });
  }
  initSizeList(arr) {
    this.sizeList = arr.map((element) => {
      element['isClick'] = false;
      return element;
    });
  }

  updateGallery(main_img, arr_img) {
    const img_link = environment.hostImage + main_img;
    const imgMain = [{ small: img_link, medium: img_link, big: img_link }];

    this.galleryImages = [...imgMain];

    arr_img.forEach((element) => {
      const link = environment.hostImage + element;
      const img = { small: link, medium: link, big: link };

      this.galleryImages = [...this.galleryImages, img];
    });
  }

  btnSizeClick(id_size) {
    if (id_size !== this.sizeId) {
      this.sizeId = id_size;
      this.sizeList.forEach((element) => {
        if (element._id === id_size) {
          this.itemLeft = element.quantity;
          element.isClick = true;
        } else {
          element.isClick = false;
        }
      });
    } else {
      this.sizeId = null;
      this.itemLeft = 0;
      this.sizeList.map((element) => {
        element.isClick = false;
      });
    }
  }

  buyNowClick() {
    if (!!!this.sizeId) {
      alert('Please select size first. Thank You!');
    } else {
      this.router.navigate([
        `/checkout/${this.product._id}/${this.sizeId}/${this.itemQuantity}`,
      ]);
    }
  }
  addCart() {
    if (!!!this.sizeId) {
      alert('Please select size first. Thank You!');
    } else {
      let currentCart = localStorage.getItem('cart');
      let newCart: any[] = JSON.parse(currentCart);
      let indexDup;
      let dup = newCart.find((item, index) => {
        indexDup = index;
        return item.sizeId === this.sizeId;
      });
      if (!dup) {
        const size = this.product.properties.find((item) => {
          return item._id === this.sizeId;
        }).size;
        const item = {
          id: this.product._id,
          name: this.product.name,
          price: this.product.price,
          mainImage: this.product.imageMain,
          size: size,
          sizeId: this.sizeId,
          quantity: this.itemQuantity,
        };
        newCart = [...newCart, item];
      } else {
        dup.quantity = dup.quantity + this.itemQuantity;
        newCart.splice(indexDup, 1, dup);
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      this.toastr.success('Add item to cart', 'Successful');
      this.readQuantityItemService.emitData(true);
    }
  }
}
