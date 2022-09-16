import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
      /**
      * Ag grid için kolon tanımı oluşturma
    */
  columnDefs: any[] = [
    {
      headerName: 'ID',
      field: 'id',
      filter: 'agNumberColumnFilter',
      sort: 'asc',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 50
    },
    {
      headerName: 'Title',
      field: 'title',
      filter: 'agTextColumnFilter',
      width: 150
    },
    {
      headerName: 'Description',
      field: 'description',
      filter: 'agTextColumnFilter',
      width: 200
    },
    {
      headerName: 'Price',
      field: 'price',
      filter: 'agTextColumnFilter',
      width: 100
    },
    {
      headerName: 'Discounting Percentage',
      field: 'discountPercentage',
      filter: 'agTextColumnFilter',
      width: 100
    },
    {
      headerName: 'Rating',
      field: 'rating',
      filter: 'agTextColumnFilter',
      width: 100
    },
    {
      headerName: 'Stock',
      field: 'stock',
      filter: 'agTextColumnFilter',
      width: 100
    },
    {
      headerName: 'Brand',
      field: 'brand',
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'notEqual', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'inRange'],
      },
      width: 175
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
      width: 175
    },
    {
      headerName: 'Thumbnail',
      field: 'thumbnail',
      filter: 'agTextColumnFilter',
      width: 175
    },
    {
      headerName: 'Images',
      field: 'images',
      filter: 'agTextColumnFilter',
      width: 175
    },
  ];
      /**
      * Kolonlar için varsayılan özelliklerin belirlenmesi.
    */
  defaultColDef = {
    filter: true,
    flex: 1,
    resizable: true,
    floatingFilter: true,
    sortable: true
  };
  rowData: any = [];
  productList: Observable<Product[]> | undefined;
  gridApi: any;
  gridColumnApi: any;
  selectedNodeLength: number = 0;
  selectedNode: any[] = [];

  constructor(private productService: ProductService, private toastr: ToastrService, private router: Router,) { }
    /**
      * Gride verilecek verilerin apiden istekle alınması.
    */
  public getDataForGrid() {
    this.productService.getUserList().subscribe(response => {
      this.rowData = response.products;
    }, (err: any) => {
      this.toastr.error(err.error.code + ' - ' + 'Failed', '');
    });
  }
      /**
      * Gridin hazırlanması.
    */
  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getDataForGrid();
  }
      /**
      * Grid üzerinde çift tıklayarak güncelleme ekranına geçer.
    */
  public onRowDoubleClicked(event: any, url: string): void {
    this.router.navigate([`${this.router.url}/${url}`], { queryParams: { id: event.data.id } });
  }
  public getAddPage(url: string): void {
    this.router.navigate([`${this.router.url}/${url}`]);
  }
  public onSelectionChanged(): void {
    this.selectedNode = [];
    if (this.gridApi != undefined) {
      this.selectedNode = this.gridApi.getSelectedNodes();
      this.selectedNodeLength = this.selectedNode.length;
    }
  }
  public getActionPage(): void {
    if (this.selectedNode.length == 1) {
      let urlParams: object = {
        id: this.selectedNode[0].data.id
      };
      this.goActionPage(urlParams);
    }
  }

  public goActionPage(o: object): void {
    this.router.navigate([this.router.url + '/edit'], {
      queryParams: o
    });
  }
}
