import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockTransferService } from '../../../services/stock-transfer/stock-transfer.service';
import Swal from 'sweetalert2';
import { RouteService } from 'src/app/services/route/route.service';
import { StockTransferModule } from '../../../modules/stockTransferModule';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  lording:any = true;

  stockTransferModule = new StockTransferModule('','','','','','','','','','','');

  constructor(
    private stockTransferService: StockTransferService,
    private routeService: RouteService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStockTransfer();
  }

  getStockTransfer(){
    this.stockTransferService.getAllStockTransfer().subscribe((res) =>{
      
      this.lording = false;
      
      this.dataArray = this.stockTransferModule;
      this.dataArray = res.msg;
      this.dataArrayLength = this.dataArray.length;

      const msgLength = res.msg.length;
      

      for(let i =0; i < msgLength; i++){

        if(res.msg[i].inRouteId == 0){
          this.dataArray[i].inRouteName = 'Main Route';
          
        }
        if(res.msg[i].inRouteId != 0){
          this.routeService.getRouteById(res.msg[i].inRouteId).subscribe((res) =>{

            this.dataArray[i].inRouteName = res.data.routeName;
            
          })
        }
        

        if(res.msg[i].toRouteId !== undefined){
          this.routeService.getRouteById(res.msg[i].toRouteId).subscribe((res) =>{
            this.dataArray[i].toRouteName = res.data.routeName;
            
          })
        }

        this.productService.getProductById(res.msg[i].productId).subscribe((res) =>{
          this.dataArray[i].productCode = res.data.productCode;
          this.dataArray[i].productName = res.data.productName;
          
        })
        
      }
      
    })
  }

  editStockTransfer(id:any){

  }

  deleteStockTransfer(id:any){

  }

  printStock(){
    window.print();
  }

}
