import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DevelopComponent } from './views/develop/develop.component';
import { RemesasComponent} from './views/remesas/remesas.component';

const routes: Routes = [
  { path:'', component:HomeComponent, pathMatch:'full'  },
  { path:'login', component:LoginComponent },
  { path: 'remesas', component:RemesasComponent},
  { path:'**', component:DevelopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
