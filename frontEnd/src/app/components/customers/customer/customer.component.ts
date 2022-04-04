import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RouteService } from 'src/app/services/route/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private routeService: RouteService,
    private router: Router
  ) { }

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  ngOnInit(): void {
    localStorage.removeItem('customerIdForUpdateCustomer');
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe((res) =>{

      this.dataArray = res.data;

      this.dataArrayLength = this.dataArray.length;

      for(let i =0; i < res.data.length; i++){
        this.routeService.getRouteById(res.data[i].routeId).subscribe((res) =>{
          this.dataArray[i].routeName = res.data.routeName;
        });
      }
      
    })
  }

  editCustomer(id:any){

    localStorage.setItem('customerIdForUpdateCustomer', id);

    this.router.navigateByUrl('dashboard/edit-customer');
    
  }

  deleteCustomer(id:any, businessName:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert " + businessName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(id).subscribe((res) =>{
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

            this.getAllCustomer();
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
