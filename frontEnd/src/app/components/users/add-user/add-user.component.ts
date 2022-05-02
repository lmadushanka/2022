import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { UserModule } from '../../../modules/userModule';
import { RouteService } from '../../../services/route/route.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userModule = new UserModule('','','','','','','','');

  routeArray:any = [];

  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

  confirmPassword = '';
  checkPass:any;

  checkUserRole:any = true;

  constructor(
    private userService: UserService,
    private routeService: RouteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoutes();
  }

  getAllRoutes(){
    this.routeService.getAllRoute().subscribe((res) =>{

      this.routeArray = res.data;
      
    })
  }


  addUser(){

    if(this.userModule.route == ''){
      this.userModule.route = '0';
    }
    

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

        this.userService.createUser(this.userModule).subscribe((res) =>{
    
          if(res.success == 1){
            this.router.navigateByUrl('dashboard/user');

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

  onSelectRoute(data:any){

    this.userModule.route= data.target.value;
    
  }

  onSelectUserRole(data:any){
    this.userModule.userRole = data.target.value;

    if(data.target.value == '0' || data.target.value == '3'){
      this.checkUserRole = false;
    }else{
      this.checkUserRole = true;
    }
    
  }

  checkPassword(){
    if(this.userModule.password == this.confirmPassword){
      this.checkPass = 1;
    }else{
      this.checkPass = 0;
    }
    
    
  }

}
