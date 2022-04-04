import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../services/route/route.service';
import { RouteModule } from '../../../modules/routeModule';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  constructor(
    private routeService: RouteService,
    private router: Router
  ) { }

  routeModule = new RouteModule('','','');
  checkCitiesValidation = false;
  cities:any;
  citiesLength:any;

  ngOnInit(): void {
  }

  addRoute(){

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

        this.routeService.addRoute(this.routeModule).subscribe((res) =>{
    
          if(res.success == 1){
            this.router.navigateByUrl('dashboard/route');

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
            title: err.error.msg + ' ' + err.error.duplicateData,
          })
        })
      }
    })
    
  }

  checkValideCities(){
    this.cities = this.routeModule.cities.split(',');
    
    this.citiesLength = this.cities.length;

    if(this.cities.length > 1){
      this.checkCitiesValidation = false;
    }else{
      this.checkCitiesValidation = true;
    }
    
  }

}
