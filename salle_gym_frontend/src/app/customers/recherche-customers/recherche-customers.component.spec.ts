import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCustomersComponent } from './recherche-customers.component';

describe('RechercheCustomersComponent', () => {
  let component: RechercheCustomersComponent;
  let fixture: ComponentFixture<RechercheCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechercheCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
