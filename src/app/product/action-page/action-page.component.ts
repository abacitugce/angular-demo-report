import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-action-page',
  templateUrl: './action-page.component.html',
  styleUrls: ['./action-page.component.scss']
})
export class ActionPageComponent {
  formModel: Product = new Product();
  editMode: boolean = true;
  newProduct: boolean = false;
  submitted: boolean = false;
  updateID: number = 0;
  constructor(private route: ActivatedRoute, private productService: ProductService, private toastr: ToastrService) {
    /**
      * Güncelleme ekran kontrolü.
    */
    this.route.queryParams.subscribe((params: any) => {
      this.updateID = params.id
      if (typeof params.id !== 'undefined') {
        this.productService.getUser(params.id).subscribe((response: any) => {
          this.formModel = new Product(response);
        });
        this.editMode = true;
      } else {
        this.productService.getUser(params.id).subscribe((response: any) => {
          this.newProduct = true;
          let maxID: number = response.data.length ? Math.max.apply(Math, response.data.map((x: any) => x.bank_type)) : 1;
          this.formModel.id = maxID ? maxID + 1 : 1;
        })
      }
    });
  }
  /**
  * Yeni kayıt ve güncelleme için api istekleri
*/
  public onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      if (this.newProduct) {
        this.toastr.success("dummyjson.com üzerinden kayıt yapılamamaktadır");
        this.productService.saveProduct(this.checkResponse(this.formModel)).subscribe((response: any) => {
          this.toastr.success("dummyjson.com üzerinden kayıt yapılamamaktadır");
          this.newProduct = false;
        })
      } else {
        this.toastr.success("dummyjson.com üzerinden update yapılamamaktadır");
        this.productService.updateProduct(this.updateID, this.checkResponse(this.formModel)).subscribe((response: any) => {
          this.toastr.success("dummyjson.com üzerinden update yapılamamaktadır");
          this.newProduct = false;
        })
      }
    }
  }
  /**
  * Fromdaki verilerin modele göre kontrolü.
*/
  private checkResponse(form: Product): any {
    return {
      id: form.id,
      title: form.title,
      description: form.description,
      price: form.price,
      discountPercentage: form.discountPercentage,
      rating: form.rating,
      stock: form.stock,
      brand: form.brand
    }
  }
}
