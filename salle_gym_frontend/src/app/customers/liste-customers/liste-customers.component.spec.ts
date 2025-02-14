import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCustomersComponent } from './liste-customers.component';

describe('ListeCustomersComponent', () => {
  let component: ListeCustomersComponent;
  let fixture: ComponentFixture<ListeCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
