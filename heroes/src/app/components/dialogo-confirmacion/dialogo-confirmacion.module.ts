import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacionRoutingModule } from './dialogo-confirmacion-routing.module';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [
    DialogoConfirmacionComponent
  ],
  imports: [
    CommonModule,
    DialogoConfirmacionRoutingModule,
    TranslateModule.forChild(),
    MatDialog,
    MatDialogRef
  ],
  exports: [
    DialogoConfirmacionComponent
  ],
  providers: [
    TranslateService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
})
export class DialogoConfirmacionModule { }
