import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RouteService } from 'src/app/services/route/route.service';
import { SaleService } from 'src/app/services/sales/sale.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;
  filterPayment:any;
  filterSales:any;

  grandTotal:any;
  totalPaidAmount:any;
  totalDueAmount:any;

  businessName:any;
  salesCount:any;

  constructor(
    private customerService:CustomerService,
    private routeService: RouteService,
    private saleService: SaleService,
  ) { }

  ngOnInit(): void {

    this.businessName = localStorage.getItem('customerNameForViewCustomer');

    this.getCustomerSalesCount();
    this.getSalesCustomerWise();
    this.getGrandTotal();
    this.getPaidTotal();

    
    
  }

  getSalesCustomerWise(){
    this.customerService.getCustomerSalesCustomerWise(localStorage.getItem('customerIdForViewCustomer')).subscribe((res) =>{
      this.dataArray = res.data;
      

      this.dataArrayLength = this.dataArray.length;

      for(let i = 0; i < res.data.length;  i++){
        
        this.customerService.getCustomerById(this.dataArray[i].customerId).subscribe((res) =>{
          this.dataArray[i].customerName = res.data.businessName;
          
        })

        this.routeService.getRouteById(this.dataArray[i].routeId).subscribe((res) =>{
          this.dataArray[i].routeName = res.data.routeName;
        });

        this.saleService.getFreeIssue(this.dataArray[i].id).subscribe((res) =>{

          this.dataArray[i].freeIssue = res.data[0].freeIssue;
          
        });
      }

      
      
    })
  }

  getCustomerSalesCount(){
    this.customerService.getCustomerSalesCount(localStorage.getItem('customerIdForViewCustomer')).subscribe((res) =>{
      this.salesCount = res.data.count;
      
    })
  }

  onFilterPaymentStatus(data:any){

    this.filterPayment = data.target.value

    if(this.filterPayment == 0){
      
      this.filterPayment = undefined;
    }

    if(this.filterPayment == undefined && this.filterSales == undefined){
      this.getSalesCustomerWise();
    }
      

    this.saleService.filterSales(this.filterPayment, this.filterSales).subscribe((res) =>{
      this.dataArray = res.data;
      

      this.dataArrayLength = this.dataArray.length;

      for(let i = 0; i < res.data.length;  i++){
        
        this.customerService.getCustomerById(this.dataArray[i].customerId).subscribe((res) =>{
          this.dataArray[i].customerName = res.data.businessName;
          
        })

        this.routeService.getRouteById(this.dataArray[i].routeId).subscribe((res) =>{
          this.dataArray[i].routeName = res.data.routeName;
        });

        this.saleService.getFreeIssue(this.dataArray[i].id).subscribe((res) =>{

          this.dataArray[i].freeIssue = res.data[0].freeIssue;
          
        });
      }
    })

  
    
  }

  onFilterSalesStatus(data:any){
    this.filterSales = data.target.value;

    if(this.filterSales == 0){
      
      this.filterSales = undefined;
    }

    if(this.filterPayment == undefined && this.filterSales == undefined){
      this.getSalesCustomerWise();
    }

    this.saleService.filterSales(this.filterPayment, this.filterSales).subscribe((res) =>{
      this.dataArray = res.data;
      

      this.dataArrayLength = this.dataArray.length;

      for(let i = 0; i < res.data.length;  i++){
        
        this.customerService.getCustomerById(this.dataArray[i].customerId).subscribe((res) =>{
          this.dataArray[i].customerName = res.data.businessName;
          
        })

        this.routeService.getRouteById(this.dataArray[i].routeId).subscribe((res) =>{
          this.dataArray[i].routeName = res.data.routeName;
        });

        this.saleService.getFreeIssue(this.dataArray[i].id).subscribe((res) =>{

          this.dataArray[i].freeIssue = res.data[0].freeIssue;
          
        });
      }
    })
  }

  getGrandTotal(){
    this.customerService.customerGrandTotal(localStorage.getItem('customerIdForViewCustomer')).subscribe((res) =>{
      this.grandTotal = res.data.grandTotal

      if(this.grandTotal == null){
        this.grandTotal = 0;
      }
      
      
    });
  }

  getPaidTotal(){
    this.customerService.customerPaidTotal(localStorage.getItem('customerIdForViewCustomer')).subscribe((res) =>{
      this.totalPaidAmount = res.data.totalPaidAmount;

      if(this.totalPaidAmount == null){
        this.totalPaidAmount = 0;
      }

      this.getTotalDue();
      
    });
  }

  getTotalDue(){
    this.totalDueAmount = Number(this.grandTotal)  - Number(this.totalPaidAmount) ;
  }

  editSale(){

  }

  deleteSale(){}

}
