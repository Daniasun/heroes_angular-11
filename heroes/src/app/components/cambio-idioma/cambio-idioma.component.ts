import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cambio-idioma',
  templateUrl: './cambio-idioma.component.html',
  styleUrls: ['./cambio-idioma.component.scss']
})
export class CambioIdiomaComponent {

  constructor(public translateService: TranslateService) { }

}
