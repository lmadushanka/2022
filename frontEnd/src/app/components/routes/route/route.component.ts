import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../../../services/route/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  constructor(
    private routeService: RouteService,
    private router: Router
  ) { }

  lording:any = true;

  dataArray:any = [];
  dataArrayLength : any;
  searchText:any;

  ngOnInit(): void {
    localStorage.removeItem('routeIdForEditRiute');
    this.getAllRoutes();
  }

  getAllRoutes(){
    this.routeService.getAllRoute().subscribe((res) =>{

      this.lording = false;

      this.dataArray = res.data;


      for(let i=0; i < res.data.length; i++){
        this.dataArray[i].cities = JSON.parse(res.data[i].cities.split(',')).toString();
      }
      

      this.dataArrayLength = this.dataArray.length;
      
      
      
    })
  }

  editRoute(id:any){
    localStorage.setItem('routeIdForEditRiute', id);

    this.router.navigateByUrl('dashboard/edit-route');
  }

  deleteRoute(id:any,routeName:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert " + routeName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.deleteRoute(id).subscribe((res) =>{
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

            this.getAllRoutes();
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
