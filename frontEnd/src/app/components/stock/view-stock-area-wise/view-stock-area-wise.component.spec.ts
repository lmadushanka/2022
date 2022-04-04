import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockAreaWiseComponent } from './view-stock-area-wise.component';

describe('ViewStockAreaWiseComponent', () => {
  let component: ViewStockAreaWiseComponent;
  let fixture: ComponentFixture<ViewStockAreaWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStockAreaWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockAreaWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
