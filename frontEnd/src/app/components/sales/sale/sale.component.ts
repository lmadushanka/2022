import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RouteService } from 'src/app/services/route/route.service';
import { SaleService } from 'src/app/services/sales/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private routeService: RouteService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getALlSales();
  }

  getALlSales(){
    this.saleService.getAllSales().subscribe((res) =>{
      this.dataArray = res.data;
      

      for(let i = 0; i < res.data.length;  i++){
        
        this.customerService.getCustomerById(this.dataArray[i].customerId).subscribe((res) =>{
          this.dataArray[i].customerName = res.data.businessName;
          
        })

        this.routeService.getRouteById(this.dataArray[i].routeId).subscribe((res) =>{
          this.dataArray[i].routeName = res.data.routeName;
        });

        this.saleService.getFreeIssue(this.dataArray[i].id).subscribe((res) =>{

          console.log(res);

          this.dataArray[i].freeIssue = res.data[0].freeIssue;
          
        });

        console.log(this.dataArray);
      }

      
      
    })

    
    
  }

  editSale(){

  }

  deleteSale(){}

}
