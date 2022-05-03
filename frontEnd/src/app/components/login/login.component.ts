import { Component, OnInit } from '@angular/core';
import { Auth } from '../../modules/authModule';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg = '';

  loginModule = new Auth('','');

  lordingButton:any = false;

  defaultButton:any = true;


  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    // this.checkToken();
  }

  singIn(){

    this.defaultButton = false;
    this.lordingButton = true;

    this.authService.signIn(this.loginModule).subscribe((res) =>{
      
      if(res.success == 1){

        localStorage.setItem('token', res.token);

        localStorage.setItem('userName', res.data.shortName);
        localStorage.setItem('userRole', res.data.userRole);
        localStorage.setItem('userId', res.data.id);
      
        this.router.navigate(['dashboard/home']).then(()=>{
          window.location.reload();
        }) 
        // this.router.navigateByUrl('dashboard/home');
      }
      
      if(res.success == 0){
        
        this.defaultButton = true;
        this.lordingButton = false;
        this.errorMsg = res.msg
      }
    });
  }

  checkToken(){
    this.authService.checkToken().subscribe((res) =>{
      
      if(res.success == 1){
        this.router.navigateByUrl('dashboard/home')
      }else{
        localStorage.clear();
      }

    });
  }

}
