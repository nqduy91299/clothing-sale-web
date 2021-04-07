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
  // galleryOptions: NgxGalleryOptions[] = [
  //   {
  //     width: '500px',
  //     height: '400px',
  //     thumbnailsColumns: 4,
  //     imagePercent: 40,
  //     imageArrows: true,
  //     fullWidth: true,
  //     imageSize: '400px',
  //     imageAnimation: NgxGalleryAnimation.Slide,
  //     previewCloseOnClick: true,
  //     previewCloseOnEsc: true,
  //   },
  //   // max-width 800
  //   {
  //     breakpoint: 800,
  //     width: '500px',
  //     height: '400px',
  //     imagePercent: 80,
  //     thumbnailsPercent: 20,
  //     thumbnailsMargin: 20,
  //     thumbnailMargin: 20,
  //   },
  //   // max-width 400
  //   {
  //     breakpoint: 400,
  //     preview: false,
  //   },
  // ];
  // galleryImages: NgxGalleryImage[] = [
  //   {
  //     small:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
  //     medium:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
  //     big:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
  //   },
  //   {
  //     small:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
  //     medium:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
  //     big:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922aa-e1607572933368.jpg',
  //   },
  //   {
  //     small:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922bb-e1607572949249.jpg',
  //     medium:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922bb-e1607572949249.jpg',
  //     big:
  //       'https://thedenimaniac.com/wp-content/uploads/2018/09/81922bb-e1607572949249.jpg',
  //   },
  // ];
  config = getConfigSummerNote();
  summernoteValue = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur minima error,
     fugit quas voluptatibus vitae quam beatae autem laborum blanditiis similique nobis. Eu
     m, enim ea nihil ipsa est sapiente eligendi quas iusto velit odio temporibus ipsam iure err
     or perferendis officiis sint itaque vero quae soluta accusamus dicta aliquam repellendus mollitia
      architecto? Veniam numquam laboriosam mollitia delectus odit, rerum voluptatem tempora culpa dolorem
      , provident commodi! Sequi distinctio nisi deleniti molestiae inventore illum necessitatibus obcaecati d
      olore nulla? Corrupti, magni. Odit quia alias maiores aspernatur ipsa tenetur distinctio nemo maxime quod vo
      luptas, facilis veniam enim iure harum atque est. Sunt deleniti aperiam, totam voluptatem id veritatis eos ex 
      dicta ea a possimus expedita incidunt aut molestias cumque nihil ducimus saepe commodi! Incidunt hic accusamus sa
      piente. Quam saepe necessitatibus consequatur quae corrupti officia delectus eum odio veniam incidunt eligendi volu
      ptate sapiente, laborum mollitia explicabo, placeat velit fugit ratione excepturi pariatur et, quibusdam cupiditate adipi
      ci suscipit. Ipsa numquam unde, recusandae repellendus sed dolorem officiis at esse quod facilis exercitationem
       commodi omnis! At iure ut quasi amet sit quae maiores magnam esse. Est veritatis voluptas harum ipsam perferendi
       s praesentium in reprehenderit ullam! Ducimus vel, commodi itaque aliquam fugiat tempore nisi voluptates tempor
       bus iste quo dolore autem error delectus, aperiam quas illum nesciunt perspiciatis cumque esse dolores doloribus?
        Voluptatum, alias atque ad voluptate aliquid quo ut aspernatur eligendi nisi, dolorem quasi illo officiis cumque a`;

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
