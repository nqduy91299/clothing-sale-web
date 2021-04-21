import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models';
import { ApiIndexService } from 'src/app/services/api-index.service';
import { ApiManageProductService } from 'src/app/services/api-manage-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  id;
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
    private activatedRoute: ActivatedRoute,
    private apiIndexService: ApiIndexService,
    private apiManageProductService: ApiManageProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.id = id;
    this.getProductById(id);
  }

  updateForm(product: ProductModel) {
    let size = product.properties;

    const sizeS = size.find((item) => {
      return item.size == 'S';
    }).quantity;
    const sizeM = size.find((item) => {
      return item.size == 'M';
    }).quantity;
    const sizeL = size.find((item) => {
      return item.size == 'L';
    }).quantity;

    this.productFrm.patchValue({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      sizeS: sizeS,
      sizeM: sizeM,
      sizeL: sizeL,
    });
  }

  getProductById(id) {
    this.apiIndexService.apiProductDetailGet(id).subscribe((res) => {
      if (res.code === 200) {
        this.updateForm(res.msg);
        console.log(res);
      }
    });
  }
  getFileArray(event) {
    this.file = event.target.files;
  }

  getFile(event) {
    this.fileArr = event.target.files;
  }

  submit() {
    this.hanldeSize();
    if (this.handleImg()) {
      this.apiManageProductService
        .apiUpdateProductPost(this.formData)
        .subscribe((res) => {
          if (res.code === 200) {
            this.toastr.success(res.msg, 'Successful');
            this.router.navigate(['/admin/products-management']);
          } else {
            this.toastr.error(res.msg, 'Error Unexpected!');
            this.router.navigate(['/admin/products-management']);
          }
        });
    } else {
      this.updateFormData();
    }
  }

  updateFormData() {
    this.formData.delete('name');
    this.formData.delete('id');
    this.formData.delete('category');
    this.formData.delete('price');
    this.formData.delete('description');
    this.formData.delete('properties');
  }

  handleImg() {
    if (!this.file?.length) {
      this.toastr.error('Please Select Main Image', 'Fail');
      return false;
    }
    if (!this.fileArr?.length) {
      this.toastr.error('Please Select Subs Image', 'Fail');
      return false;
    }
    for (let i = 0; i < this.file.length; i++) {
      this.formData.append('imageArray', this.file[i], this.file[i].name);
    }
    for (let i = 0; i < this.fileArr.length; i++) {
      this.formData.append('imageMain', this.fileArr[i], this.fileArr[i].name);
    }
    return true;
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
    this.formData.append('id', this.id);
    this.formData.append('category', this.productFrm.value.category);
    this.formData.append('price', this.productFrm.value.price);
    this.formData.append('description', this.productFrm.value.description);
    this.formData.append('properties', this.productFrm.value.properties);
  }
}
