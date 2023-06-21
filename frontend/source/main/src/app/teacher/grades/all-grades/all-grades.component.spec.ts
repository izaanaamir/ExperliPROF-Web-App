import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSchoolsComponent } from './all-schools.component';

describe('AllSchoolsComponent', () => {
  let component: AllSchoolsComponent;
  let fixture: ComponentFixture<AllSchoolsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
