import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { RouteService } from 'src/app/services/route/route.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-view-stock-area-wise',
  templateUrl: './view-stock-area-wise.component.html',
  styleUrls: ['./view-stock-area-wise.component.css']
})
export class ViewStockAreaWiseComponent implements OnInit {

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  lording:any = true;

  routeArray:any = [];

  constructor(
    private stockService: StockService,
    private productService: ProductService,
    private routeService: RouteService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllRoute();


    this.stockService.getAllSum().subscribe((res) =>{

      this.lording = false;

      this.dataArray = res.data;

      for(let i = 0; i < res.data.length; i++){
        this.productService.getProductById(this.dataArray[i].productId).subscribe((res) =>{
          
          this.dataArray[i].productName = res.data.productName;

          this.dataArray[i].productCode = res.data.productCode;
        });
      }

      this.dataArrayLength = this.dataArray.length;
    })
  }

  getAllRoute(){
    this.routeService.getAllRoute().subscribe((res) =>{

      this.lording = false;
      
      this.routeArray = res.data;
      
    })
  }

  onSelectRoute(data:any){

    if(data.target.value == ""){
      
      this.stockService.getAllSum().subscribe((res) =>{
        this.dataArray = res.data;
  
        for(let i = 0; i < res.data.length; i++){
          this.productService.getProductById(this.dataArray[i].productId).subscribe((res) =>{
            
            this.dataArray[i].productName = res.data.productName;
  
            this.dataArray[i].productCode = res.data.productCode;
          });
        }
  
        this.dataArrayLength = this.dataArray.length;
      })
    }else{
      this.stockService.getStockByRoute(data.target.value).subscribe((res) =>{

        this.dataArray = res.data;
  
        for(let i = 0; i < res.data.length; i++){
          this.productService.getProductById(this.dataArray[i].productId).subscribe((res) =>{
            
            this.dataArray[i].productName = res.data.productName;
  
            this.dataArray[i].productCode = res.data.productCode;
          });
        }
  
        this.dataArrayLength = this.dataArray.length;
        
        
      })
    }
    
    
    
  }

}
