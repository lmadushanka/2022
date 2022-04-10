import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName:any;
  userRole:any;

  subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkValidation();

    this.userName = localStorage.getItem('userName');
    this.userRole = localStorage.getItem('userRole');
  }

  checkValidation(){
    
    this.subscription = timer(0, 1000 * 60).pipe(
      switchMap(() => this.authService.checkToken())
    ).subscribe((res) =>{
      if(res.success == 0){
        localStorage.clear();
        this.router.navigateByUrl('/login')
        console.log('test');
        
      }
    })
  }

}
