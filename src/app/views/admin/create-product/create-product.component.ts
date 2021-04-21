import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManageProductService } from 'src/app/services/api-manage-product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  fileArr: FileList;
  file: FileList;
  formData: FormData = new FormData();
  productFrm: FormGroup = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null),
    price: new FormControl(null),
    description: new FormControl(null),
    properties: new FormControl(null),
    sizeS: new FormControl(null),
    sizeM: new FormControl(null),
    sizeL: new FormControl(null),
    imageMain: new FormControl(null),
    imageArray: new FormControl(null),
  });

  constructor(
    private apiManageProductService: ApiManageProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getFileArray(event) {
    this.file = event.target.files;
  }

  getFile(event) {
    this.fileArr = event.target.files;
  }

  submit() {
    this.hanldeSize();
    this.handleImg();

    this.apiManageProductService
      .apiCreateProductPost(this.formData)
      .subscribe((res) => {
        if (res.code === 200) {
          this.toastr.success(res.msg, 'Successful');
          this.router.navigate(['/admin/products-management']);
        } else {
          this.toastr.error(res.msg, 'Error Unexpected!');
          this.router.navigate(['/admin/products-management']);
        }
      });
  }

  handleImg() {
    for (let i = 0; i < this.file.length; i++) {
      this.formData.append('imageArray', this.file[i], this.file[i].name);
    }
    for (let i = 0; i < this.fileArr.length; i++) {
      this.formData.append('imageMain', this.fileArr[i], this.fileArr[i].name);
    }
  }

  hanldeSize() {
    const sizeS = this.productFrm.value.sizeS;
    const sizeM = this.productFrm.value.sizeM;
    const sizeL = this.productFrm.value.sizeL;
    const obj = [
      {
        size: 'S',
        quantity: sizeS,
      },
      {
        size: 'M',
        quantity: sizeM,
      },
      {
        size: 'L',
        quantity: sizeL,
      },
    ];

    let json = JSON.stringify(obj);
    this.productFrm.patchValue({
      properties: json,
    });
    this.formData.append('name', this.productFrm.value.name);
    this.formData.append('category', this.productFrm.value.category);
    this.formData.append('price', this.productFrm.value.price);
    this.formData.append('description', this.productFrm.value.description);
    this.formData.append('properties', this.productFrm.value.properties);
  }
}
