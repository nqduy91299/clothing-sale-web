import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() itemCardConfig: itemCardConFig;
  @Input() id: String;
  @Input() isFavorite: Boolean = false;
  @Input() imgSrc: String =
    'https://thedenimaniac.com/wp-content/uploads/2020/12/63977-aa-600x600.jpg';
  @Output() idOutput: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  btnFavoriteClick() {
    this.isFavorite = !this.isFavorite;
  }

  btnClick() {
    this.idOutput.emit(this.id);
  }
}

export interface itemCardConFig {
  id: string;
  isFavorite: boolean;
  isSale: boolean;
  imgSrc: string;
  sizes: string[];
}
