import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductModule } from '../../../modules/productModule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  ngOnInit(): void {
    localStorage.removeItem('productIdForEditProdcut');
    this.getAllProduct();
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe((res) =>{
      this.dataArray = res.data;

      this.dataArrayLength = this.dataArray.length;
      
    })
  }

  editProduct(id:any){

    localStorage.setItem('productIdForEditProdcut',id);

    this.router.navigateByUrl('dashboard/edit-product');

  }

  deleteProduct(id:any, productName:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert " + productName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((res) =>{
          if(res.success == 1){
            

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Your work has been Deleted'
            })

            this.getAllProduct();
          }
          
        }, (err) =>{

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: err.error.msg,
          })
        })
      }
    })
  }

}
