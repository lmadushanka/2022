import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/users/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { RouteComponent } from './components/routes/route/route.component';
import { AddRouteComponent } from './components/routes/add-route/add-route.component';
import { EditRouteComponent } from './components/routes/edit-route/edit-route.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';

const appRoutes: Routes = [
  {path:'login', component: LoginComponent},
  {
    path: 'dashboard', component: HeaderComponent,
    children: [
      { path: 'home', component: HomeComponent},
      {path: 'user', component: UserComponent},
      {path: 'add-user', component : AddUserComponent},
      {path: 'route', component : RouteComponent},
      {path: 'add-route', component : AddRouteComponent},
      {path: 'edit-route', component : EditRouteComponent},
      {path: 'customer', component : CustomerComponent},
      {path: 'add-customer', component : AddCustomerComponent},
      {path: 'edit-customer', component : EditCustomerComponent}
    ]
  },
  {path: '**', redirectTo: '/login', pathMatch :'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    FooterComponent,
    AddUserComponent,
    EditUserComponent,
    RouteComponent,
    AddRouteComponent,
    EditRouteComponent,
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, RouterModule.forRoot(appRoutes)
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
