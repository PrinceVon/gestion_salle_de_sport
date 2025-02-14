import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePackComponent } from './choose-pack.component';

describe('ChoosePackComponent', () => {
  let component: ChoosePackComponent;
  let fixture: ComponentFixture<ChoosePackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoosePackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
