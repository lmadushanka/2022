import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockTransferModule } from 'src/app/modules/stockTransferModule';
import { ProductService } from 'src/app/services/product/product.service';
import { RouteService } from 'src/app/services/route/route.service';
import { StockTransferService } from 'src/app/services/stock-transfer/stock-transfer.service';
import { StockService } from 'src/app/services/stock/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-stock-transfer',
  templateUrl: './add-stock-transfer.component.html',
  styleUrls: ['./add-stock-transfer.component.css']
})
export class AddStockTransferComponent implements OnInit {

  constructor(
    private stockTransferService: StockTransferService,
    private productService: ProductService,
    private routeService: RouteService,
    private stockService: StockService,
    private router: Router
  ) { }

  stockTransferModule = new StockTransferModule('','','','','','','','','','','');
  routeArray:any = [];
  productArray:any = [];
  inRouteValidation:any;
  toRouteValidation:any;
  productValidation:any;
  stockValidation:any;

  stockModule:any = {
    productId: '',
    routeId: ''
  }

  stockAmount:any;

  finalDate:any;

  ngOnInit(): void {
    this.getAllRoute();
    this.getAllProduct();

    const date:any = new Date().toLocaleDateString().split('/');

    if(date[0].length == 1){
      date[0] = '0'+date[0];
    }

    if(date[1].length == 1){
      date[1] = '0'+date[1];
    }

    this.finalDate =  date[1]+'/'+date[0]+'/'+date[2];
  }

  getAllRoute(){
    this.routeService.getAllRoute().subscribe((res) =>{
      this.routeArray = res.data;
      
    });

    this.inRouteValidation = true;
    this.toRouteValidation = true;
    this.productValidation = true;
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe((res) =>{
      this.productArray = res.data;
      
    });
  }

  selectInRoute(data:any){

    if(data.target.value == ''){
      this.inRouteValidation = true;
    }

    if(data.target.value != ''){
      this.inRouteValidation = false;
    }

    this.stockTransferModule.inRouteId = data.target.value

  }

  selectToRoute(data:any){
    if(data.target.value == ''){
      this.toRouteValidation = true;
    }

    if(data.target.value != ''){
      this.toRouteValidation = false;
    }

    this.stockTransferModule.toRouteId = data.target.value
  }

  selectProduct(data:any){
    if(data.target.value == ''){
      this.productValidation = true;
    }

    if(data.target.value != ''){
      this.productValidation = false;
    }

    this.stockTransferModule.productId = data.target.value
  }

  getStock(){
    this.stockModule.routeId = this.stockTransferModule.inRouteId;
    this.stockModule.productId = this.stockTransferModule.productId;

    this.stockService.getStockAmount(this.stockModule).subscribe((res) =>{

      this.stockAmount = res.data.stock;
      
    })
  }

  checkStock(){
    
    if(this.stockAmount < this.stockTransferModule.stock){
      this.stockValidation = true;
    }else{
      this.stockValidation = false;
    }
    
  }

  addStockTransfer(){

    this.stockTransferModule.date = this.finalDate;
    this.stockTransferModule.status = 1;

    this.stockTransferModule.routeId = this.stockTransferModule.toRouteId;



    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to add this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.stockTransferService.addStockTransfer(this.stockTransferModule).subscribe((res) =>{
    
          if(res.success == 1){
            this.router.navigateByUrl('dashboard/stockTransfer');

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
              title: 'Your work has been saved'
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
