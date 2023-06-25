import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { CredentialsComponent } from './credentials.component';

describe('CredentialsComponent', () => {
  let component: CredentialsComponent;
  let fixture: ComponentFixture<CredentialsComponent>;
  let mockDialogRef: MatDialogRef<CredentialsComponent>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    await TestBed.configureTestingModule({
      declarations: [CredentialsComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Clipboard, useValue: jasmine.createSpyObj(['copy']) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add your additional unit tests here
});
