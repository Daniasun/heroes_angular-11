import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioIdiomaRoutingModule } from './cambio-idioma-routing.module';
import { CambioIdiomaComponent } from './cambio-idioma.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    CambioIdiomaComponent
  ],
  imports: [
    CommonModule,
    CambioIdiomaRoutingModule,
    TranslateModule.forChild()
  ],
  exports: [
    CambioIdiomaComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CambioIdiomaModule { }
