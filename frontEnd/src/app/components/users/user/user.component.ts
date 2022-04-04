import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { RouteService } from '../../../services/route/route.service';
import { UserModule } from '../../../modules/userModule';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  constructor(
    private userService: UserService,
    private routeService : RouteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('userIdforEditUser')
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getAllUser().subscribe((res) =>{

      this.dataArray = res.data;

      for(let i = 0; i < res.data.length; i++){

        if(res.data[i].route != null){
          this.routeService.getRouteById(res.data[i].route).subscribe((res) =>{

            this.dataArray[i].route = res.data.routeName;
            
          })
        }else{
          this.dataArray[i].route ='Main Stock'
        }
        
        
      }

      this.dataArrayLength = this.dataArray.length;
      
      
    })
  }

  deleteUser(data:any, name:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert " + name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(data).subscribe((res) =>{
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

            this.getAllUser();
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

  editUser(id:any){
    localStorage.setItem('userIdforEditUser', id);
    this.router.navigateByUrl('dashboard/edit-user');
  }

}
