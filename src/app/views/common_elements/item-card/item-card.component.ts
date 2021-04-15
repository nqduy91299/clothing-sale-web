import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/models/index.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() itemCardConfig: ProductModel;
  @Input() itemSizeConfig;
  @Output() idOutput: EventEmitter<any> = new EventEmitter();
  imgSrc: String =
    'https://thedenimaniac.com/wp-content/uploads/2020/12/63977-aa-600x600.jpg';

  imgHost = environment.hostImage;
  sizeId = null;
  isFavorite: Boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.itemSizeConfig.forEach((element) => {
      element['isClick'] = false;
    });
  }

  btnFavoriteClick() {
    this.isFavorite = !this.isFavorite;
  }

  btnClick() {
    this.idOutput.emit({ id: this.itemCardConfig._id, sizeId: this.sizeId });
  }

  btnSizeClick(size_id) {
    if (size_id !== this.sizeId) {
      this.sizeId = size_id;
      this.itemSizeConfig.forEach((element) => {
        if (element._id === size_id) {
          element.isClick = true;
        } else {
          element.isClick = false;
        }
      });
    } else {
      this.sizeId = null;
      this.itemSizeConfig.map((element) => {
        element.isClick = false;
      });
    }
  }
}
