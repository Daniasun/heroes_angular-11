import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('DialogoConfirmacionComponent', () => {
  let component: DialogoConfirmacionComponent;
  let fixture: ComponentFixture<DialogoConfirmacionComponent>;
  let matDialogRef: MatDialogRef<DialogoConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        TranslateService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [ DialogoConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoConfirmacionComponent);
    component = fixture.componentInstance;
    matDialogRef = component.dialogo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
