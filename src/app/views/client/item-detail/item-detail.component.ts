import { Component, OnInit } from '@angular/core';

import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [
    {
      breakpoint: 1800,
      width: '100px !important',
      height: '100px !important',
      preview: true,
      previewArrows: true,
      previewCloseOnEsc: true,
      previewCloseOnClick: true,
      imagePercent: 80,
      imageAnimation: NgxGalleryAnimation.Slide,
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20,
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false,
    },
  ];
  galleryImages: NgxGalleryImage[] = [
    {
      small:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
      medium:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
      big:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
    },
    {
      small:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
      medium:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
      big:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
    },
    {
      small:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922bb-e1607572949249.jpg',
      medium:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922bb-e1607572949249.jpg',
      big:
        'https://thedenimaniac.com/wp-content/uploads/2018/09/81922bb-e1607572949249.jpg',
    },
  ];
  config = getConfigSummerNote();
  summernoteValue = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur minima error,
     fugit quas voluptatibus vitae quam beatae autem laborum blanditiis similique nobis. Eu
     m, enim ea nihil ipsa est sapiente eligendi quas iusto velit odio temporibus ipsam iure err
     or perferendis officiis sint itaque vero quae soluta accusamus dicta aliquam repellendus mollitia
      architecto? Veniam numquam laboriosam mollitia delectus odit, rerum voluptatem tempora culpa dolorem
           s praesentium in reprehenderit ullam! Ducimus vel, commodi itaque aliquam fugiat tempore nisi volupta`;

  constructor() {}

  ngOnInit(): void {}
}

export function getConfigSummerNote() {
  return {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };
}
