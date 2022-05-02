import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatProgressBarModule } from '@angular/material/progress-bar'


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
import { ProductComponent } from './components/products/product/product.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { StockComponent } from './components/stock/stock/stock.component';
import { AddStockComponent } from './components/stock/add-stock/add-stock.component';
import { EditStockComponent } from './components/stock/edit-stock/edit-stock.component';
import { ViewStockAreaWiseComponent } from './components/stock/view-stock-area-wise/view-stock-area-wise.component';
import { StockTransferComponent } from './components/stockTransfer/stock-transfer/stock-transfer.component';
import { AddStockTransferComponent } from './components/stockTransfer/add-stock-transfer/add-stock-transfer.component';
import { EditStockTransferComponent } from './components/stockTransfer/edit-stock-transfer/edit-stock-transfer.component';
import { SaleComponent } from './components/sales/sale/sale.component';
import { AddSaleComponent } from './components/sales/add-sale/add-sale.component';
import { EditSaleComponent } from './components/sales/edit-sale/edit-sale.component';
import { ViewCustomerComponent } from './components/customers/view-customer/view-customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path:'login', component: LoginComponent},
  {
    path: 'dashboard', component: HeaderComponent,
    children: [
      { path: 'home', component: HomeComponent},
      {path: 'user', component: UserComponent},
      {path: 'add-user', component : AddUserComponent},
      {path: 'edit-user', component : EditUserComponent},
      {path: 'route', component : RouteComponent},
      {path: 'add-route', component : AddRouteComponent},
      {path: 'edit-route', component : EditRouteComponent},
      {path: 'customer', component : CustomerComponent},
      {path: 'add-customer', component : AddCustomerComponent},
      {path: 'edit-customer', component : EditCustomerComponent},
      {path: 'view-customer', component : ViewCustomerComponent},
      {path: 'product', component : ProductComponent},
      {path: 'add-product', component : AddProductComponent},
      {path: 'edit-product', component : EditProductComponent},
      {path: 'stock', component : StockComponent},
      {path: 'add-stock', component : AddStockComponent},
      {path: 'edit-stock', component : EditStockComponent},
      {path: 'stock-area-wise', component : ViewStockAreaWiseComponent},
      {path: 'stockTransfer', component : StockTransferComponent},
      {path: 'add-stockTransfer', component : AddStockTransferComponent},
      {path: 'edit-stockTransfer', component : EditStockTransferComponent},
      {path: 'sale', component : SaleComponent},
      {path: 'add-sale', component : AddSaleComponent},
      {path: 'edit-sale', component : EditSaleComponent},
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
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    StockComponent,
    AddStockComponent,
    EditStockComponent,
    ViewStockAreaWiseComponent,
    StockTransferComponent,
    AddStockTransferComponent,
    EditStockTransferComponent,
    SaleComponent,
    AddSaleComponent,
    EditSaleComponent,
    ViewCustomerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    MatProgressBarModule,
    AppRoutingModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
