import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { RouteService } from '../../../services/route/route.service';
import { UserModule } from '../../../modules/userModule';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private routerService: RouteService,
    private router: Router
  ) { }

  userId:any;
  userModule = new UserModule('','','','','','','','');

  routeArray:any = [];

  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

  confirmPassword = '';
  checkPass:any;

  routeName:any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('userIdforEditUser');
    
    this.getUserById();
  }

  getUserById(){
    this.userService.getUserById(this.userId).subscribe((res) =>{

      this.userModule = res.data;

      this.getRouteById();

      this.getAllroute();
      
      
    })
  }

  getRouteById(){
    this.routerService.getRouteById(this.userModule.route).subscribe((res) =>{

      this.routeName = res.data.routeName;
      
    })
  }

  getAllroute(){
    this.routerService.getAllRoute().subscribe((res) =>{
      this.routeArray = res.data;
      
    })
  }

  editUser(){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to Update " + this.userModule.shortName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.updateUserById(this.userModule, this.userId).subscribe((res) =>{
    
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
              title: 'Your work has been updated'
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
  }

  checkPassword(){
    if(this.userModule.password == this.confirmPassword){
      this.checkPass = 1;
    }else{
      this.checkPass = 0;
    }
    
    
  }

}
