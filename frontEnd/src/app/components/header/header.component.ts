import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkValidation();
  }

  checkValidation(){
    this.authService.checkToken().subscribe((res) =>{
      if(res.success == 0){
        localStorage.clear();
        this.router.navigateByUrl('/login')
      }
      
    })
  }

}
