import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private customerService: CustomerService
  ) { }

  customerCount:any = 0;

  ngOnInit(): void {
    this.getCustomerCount();
  }

  getCustomerCount(){
    this.customerService.getCustomerCount().subscribe((res) =>{
      this.customerCount = res.data.customerCount;
      
    })
  }

}
