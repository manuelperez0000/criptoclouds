import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DevelopComponent } from './views/develop/develop.component';
import { RemesasComponent} from './views/remesas/remesas.component';
import { NavtabComponent } from './components/navtab/navtab.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotpassComponent } from './views/forgotpass/forgotpass.component';
import { PoliticsComponent } from './views/politics/politics.component'; 
import { DatoscompraComponent } from './views/datoscompra/datoscompra.component';
import { CalificationsComponent } from './views/califications/califications.component';
import { ContactComponent } from './views/contact/contact.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashGuard } from './guards/dash.guard';
import { DatosventaComponent } from './views/datosventa/datosventa.component';
import { CriptosComponent } from './views/criptos/criptos.component';
import { ResguardaComponent } from './views/resguarda/resguarda.component';

const routes: Routes = [
  { path:'',              component:HomeComponent, pathMatch:'full'  },
  { path:'home',          component:HomeComponent },
  { path: 'remesas',      component:RemesasComponent },
  { path: 'navtab',       component:NavtabComponent },
  { path: 'login',        component:LoginComponent },
  { path: 'register',     component:RegisterComponent },
  { path: 'forgotpass',   component:ForgotpassComponent },
  { path: 'politics',     component:PoliticsComponent },
  { path: 'datoscompra/:ves/:coin/:amount',  component:DatoscompraComponent, canActivate: [ DashGuard ] },
  { path: 'datosventa/:ves/:coin/:amount',  component:DatosventaComponent, canActivate: [ DashGuard ] },
  { path: 'contact',      component:ContactComponent },
  { path: 'califications',component:CalificationsComponent },
  { path: 'criptos',component:CriptosComponent },
  { path: 'resguarda',component:ResguardaComponent, canActivate:[ DashGuard] },
  { path: 'dashboard',    component:DashboardComponent, canActivate: [ DashGuard ] },
  { path:'**',            component:DevelopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
