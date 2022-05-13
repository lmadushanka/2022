import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { StockModule } from '../../../modules/stockModule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  stockModule = new StockModule('','','','','','','','');

  lording:any = true;

  constructor(
    private stockService: StockService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllStock();

    this.successStockAdd();

    localStorage.removeItem('stockIdForEditStock');
    localStorage.removeItem('productNameForEditStock');
  }

  successStockAdd(){
    if(localStorage.getItem('successStockAdded') == '1'){
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

    localStorage.removeItem('successStockAdded');
  }


  getAllStock(){
    this.stockService.getAll().subscribe((res) =>{

      console.log(res);
      
      
      this.lording = false;
      
      this.dataArray = res.data;

      for(let i = 0; i < res.data.length; i++){
        this.productService.getProductById(this.dataArray[i].product_id).subscribe((res) =>{
          
          this.dataArray[i].productName = res.data.productName;

          this.dataArray[i].productCode = res.data.productCode;
        });
      }
      this.dataArrayLength = this.dataArray.length;
      
      
    });
  }

  editStock(id:any, prodcutName:any){
    localStorage.setItem('stockIdForEditStock', id);
    localStorage.setItem('productNameForEditStock', prodcutName);
    this.router.navigateByUrl('/dashboard/edit-stock');
  }

  deleteStock(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockService.delete(id).subscribe((res) =>{
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

            this.getAllStock();
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

  onApprove(id:any, qty:any){
    Swal.fire({
      title: 'Do you want to approve or reject?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Approved',
      denyButtonText: `Rejected`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.stockModule.recieved = qty;

        this.stockService.updateRecieved(this.stockModule, id).subscribe((res) =>{
          
          Swal.fire('Stock approved!', '', 'success')
          this.getAllStock();
        })
      } else if (result.isDenied) {

        this.stockService.rejectStock(this.stockModule, id).subscribe((res) =>{
          Swal.fire('Stock rejected!', '', 'error')

          this.getAllStock();
        })
        
      }
    })

    console.log(this.stockModule);
    
  }

  printStock(){
    window.print();
  }

}
