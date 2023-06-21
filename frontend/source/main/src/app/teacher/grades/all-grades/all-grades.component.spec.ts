import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllGradesComponent } from './all-grades.component';

describe('AllGradesComponent', () => {
  let component: AllGradesComponent;
  let fixture: ComponentFixture<AllGradesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
