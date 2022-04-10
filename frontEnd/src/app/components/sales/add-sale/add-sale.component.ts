import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { SalesModule } from '../../../modules/salesModule';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  public searchInput: String = '';

  name = 'Angular';

  stockForm: FormGroup;  

  saleModule = new SalesModule('','','','','','','','','','','','','','','','');

  routeArray:any = [];

  productArray:any = [];


  constructor(
    private fb:FormBuilder,
  ) {
    this.stockForm = this.fb.group({
      stock: this.fb.array([]),
    });
   }

  ngOnInit(): void {
  }


  onSubmit(){

  }

  quantities() : FormArray{
    return this.stockForm.get("stock") as FormArray
  }

  newQuantity() : FormGroup {
    
    return this.fb.group({
      productId: '',
      stockAmount: ''
    })
  }

  addQuantity(){
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i:number){
    this.quantities().removeAt(i)
  }

  onSelectUserRole(data:any){

  }

  sendData(data:any){
    console.log(data);
    
  }

}
