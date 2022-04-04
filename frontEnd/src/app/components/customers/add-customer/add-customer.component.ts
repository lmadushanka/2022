import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModule } from 'src/app/modules/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) { }


  customerModule = new CustomerModule('','','','','','','','','','','','','','');

  ngOnInit(): void {
    
    console.log(new Date().toLocaleDateString());
    
  }

  addCustomer(){



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

        this.customerModule.added_at = new Date().toLocaleDateString('M/d/yy');

        this.customerService.createCustomer(this.customerModule).subscribe((res) =>{
    
          if(res.success == 1){
            this.router.navigateByUrl('dashboard/customer');

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
