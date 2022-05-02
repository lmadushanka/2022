import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SalesModule } from '../../../modules/salesModule';
import { ProducrSaleModule } from '../../../modules/productSaleModule';
import { SaleService } from 'src/app/services/sales/sale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  public searchInput: String = '';

  name = 'Angular';

  searchText:any;
  searchText2:any;

  saleModule = new SalesModule('','','','','','','','','','','','','','','','','','',[]);

  

  tempProductSale = {
    product_id : '',
    productName: '',
    qty: '',
    freeIssue: '',
    unitPrice: '',
    discount: '',
    total: '',
  }


  addProductSaleForm = new FormGroup({
    product_id: new FormControl(),
    qty: new FormControl(),
    freeIssue: new FormControl(),
    total: new FormControl(),
  });

  productSaleArray:Array<ProducrSaleModule> = [];

  productSaleArrayLength:any = false;

  typedQty:any;
  typeFreeIssue:any = 0;

  routeArray:any = [];
  customerArray:any = [];

  productArray:any = [];

  //calculation
  totalPrice:any;
  productPrice:any;
  total:any;

  addCheque:any

  chequeCustomer:any = false;

  netTotal:any = 0;
  chequeNumber:any;
  account:any;
  paidAmount:any = 0;

  finalDate:any;

  totalQty:any = 0;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const date:any = new Date().toLocaleDateString().split('/');

    if(date[0].length == 1){
      date[0] = '0'+date[0];
    }

    if(date[1].length == 1){
      date[1] = '0'+date[1];
    }

    this.finalDate =  date[1]+'/'+date[0]+'/'+date[2];



    this.getAllCustomer();
    this.getAllProduct();
  }


  onAdd(){
    
    this.productService.getProductById(this.addProductSaleForm.value.product_id).subscribe((res) =>{
      
      let productSaleModule = new ProducrSaleModule();

      this.productPrice = res.data.sale;
      productSaleModule.productName = res.data.productName;
      productSaleModule.unitPrice = this.productPrice;

      this.total = this.productPrice * this.addProductSaleForm.value.qty;
      

      productSaleModule.product_id = this.addProductSaleForm.value.product_id;
      productSaleModule.freeIssue = this.addProductSaleForm.value.freeIssue;
      productSaleModule.qty = this.addProductSaleForm.value.qty;
      productSaleModule.total = this.total;

      this.productSaleArray.push(productSaleModule);

      this.saleModule.productSale = this.productSaleArray;

      for(let i = 0; i < this.productArray.length; i++){
        if(this.productArray[i].id == productSaleModule.product_id){
          
         this.productArray.splice(Element, i+1)
          
        }
      }

      this.netTotal = this.netTotal + this.total;

      this.saleModule.grandTotal = this.netTotal;

      this.totalQty = this.totalQty + this.addProductSaleForm.value.qty;

      this.addProductSaleForm.reset();

      if(this.productSaleArray.length > 0 ){
        this.productSaleArrayLength = true;
      }else{
        this.productSaleArrayLength = false;
      }
      
    });
    
  }

  onSubmit(){
    this.saleModule.userId = localStorage.getItem('userId');
    this.saleModule.createdAt = this.finalDate;
    this.saleModule.totalPrice = this.netTotal;
    this.saleModule.chequeNumber = this.chequeNumber;
    
    
    if(this.saleModule.paymentStatus == 1){
      this.saleModule.salesSatatus = 1
    }else if(this.saleModule.paymentStatus == 2){
      this.saleModule.salesSatatus = 2
    }else if(this.saleModule.paymentStatus == 3){
      this.saleModule.salesSatatus = 3
    }else if(this.saleModule.paymentStatus == 4){
      this.saleModule.salesSatatus = 2
    }

    this.saleModule.totalQty = this.totalQty;
    this.saleModule.totalDiscount = 0;
    this.saleModule.grandTotal = this.netTotal;

    if(this.saleModule.paymentStatus == 1){
      this.saleModule.paidAmount = this.saleModule.grandTotal;
    }else if(this.saleModule.paymentStatus == 2){
      this.saleModule.paidAmount = 0;
    }else{
      this.saleModule.paidAmount = this.paidAmount;
    }
    
    this.saleModule.salesNote = '';

    console.log(this.saleModule);

    this.saleService.addSale(this.saleModule).subscribe((res) =>{
      if(res){
        this.router.navigateByUrl('/dashboard/sale')
      }
      
    })
    
  }

  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe((res) =>{
      this.customerArray = res.data;
    })
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe((res) =>{
      this.productArray = res.data;
    })
  }

  onSelectCustomer(data:any){
    this.saleModule.customerId = data.target.value;

    if(data.target.value != ''){
      this.chequeCustomer = true
    }else{
      this.chequeCustomer = false
    }
    
  }

  onSelectPayment(data:any){
    this.saleModule.paymentStatus = data.target.value;

    if(Number(data.target.value) == 3){
      this.addCheque = 3;
    }else if(Number(data.target.value) == 2){
      this.addCheque = 2;
    }else if(Number(data.target.value) == 4){
      this.addCheque = 4;
    }else{
      this.addCheque = 1;
    }
  }

  onSelectAcound(data:any){
    this.saleModule.account = data.target.value;
  }

  editProductSale(data:any){

    console.log(data);
    
    
  }

  removeProductSale(id:any){

  }

}
