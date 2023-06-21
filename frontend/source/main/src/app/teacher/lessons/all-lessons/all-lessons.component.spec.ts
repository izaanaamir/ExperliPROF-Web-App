import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllLessonsComponent } from './all-lessons.component';

describe('AllLessonsComponent', () => {
  let component: AllLessonsComponent;
  let fixture: ComponentFixture<AllLessonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
