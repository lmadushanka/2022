import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { StockService } from '../../../services/stock/stock.service';
import { StockModule } from '../../../modules/stockModule';
import { RouteService } from 'src/app/services/route/route.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  name = 'Angular';

  stockForm: FormGroup;  

  routeArray:any = [];

  productArray:any = [];

  stockModule = new StockModule('','','','','','','','');

  constructor( 
    private fb:FormBuilder,
    private routeService: RouteService,
    private stockService: StockService,
    private productService: ProductService,
    private router: Router
  ) { 
    this.stockForm = this.fb.group({
      stock: this.fb.array([]),
    });
  }

  finalDate:any;

  ngOnInit(): void {
    this.getAllRoute();
    this.getAllProduct();
  }

  quantities() : FormArray{
    return this.stockForm.get("stock") as FormArray
  }

  newQuantity() : FormGroup {
    
    return this.fb.group({
      productId: '',
      stockAmount: ''
    })
  }

  addQuantity(){
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i:number){
    this.quantities().removeAt(i)
  }

  onSubmit(){

    this.stockModule.product_id = this.stockForm.value.productId;
    this.stockModule.qty = this.stockForm.value.stock;
    
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

          localStorage.setItem('successStockAdded','1');

          for( let i = 0; i < this.stockForm.value.stock.length; i++){
            this.stockModule.product_id = this.stockForm.value.stock[i].productId;
            this.stockModule.qty = this.stockForm.value.stock[i].stockAmount;
            

            this.stockService.createStock(this.stockModule).subscribe((res) =>{
      
              if(res.success == 1){
                this.router.navigateByUrl('dashboard/stock');
    
                
              }
              
            })
          }
  
          
        }
      })
    
    
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe((res) =>{
      this.productArray = res.data
      
    });
  }

  getAllRoute(){
    this.routeService.getAllRoute().subscribe((res) =>{
      this.routeArray = res.data;
    });
  }

}
