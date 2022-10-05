import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormularioComponent} from '../formulario/formulario.component';

const routes: Routes = [
  { path: 'tabla-heroes', component: FormularioComponent, loadChildren: () =>
      import('./dialogo-confirmacion.module')
        .then(m => m.DialogoConfirmacionModule)  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogoConfirmacionRoutingModule { }
