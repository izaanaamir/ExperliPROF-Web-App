import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutLessonsComponent } from './about-lessons.component';

describe('AboutLessonsComponent', () => {
  let component: AboutLessonsComponent;
  let fixture: ComponentFixture<AboutLessonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
