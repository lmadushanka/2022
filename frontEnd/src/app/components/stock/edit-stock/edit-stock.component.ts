import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock/stock.service';
import { StockModule } from '../../../modules/stockModule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  productName:any;
  stock:any;

  stockModule = new StockModule('','','','','','','');

  constructor(
    private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productName = localStorage.getItem('productNameForEditStock');

    this.getStockById();
  }


  getStockById(){
    this.stockService.getStockById(localStorage.getItem('stockIdForEditStock')).subscribe((res) =>{

      this.stock = res.data.stock;
      
    })
  }

  update(){

    this.stockModule.stock = this.stock;
    this.stockModule.status = 1;


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to Update " + localStorage.getItem('productNameForEditStock'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.stockService.update(this.stockModule, localStorage.getItem('stockIdForEditStock')).subscribe((res) =>{
    
          if(res.success == 1){
            this.router.navigateByUrl('dashboard/stock');

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
              title: 'Your work has been updated'
            })
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
