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

const routes: Routes = [
  { path:'',            component:HomeComponent, pathMatch:'full'  },
  { path: 'remesas',    component:RemesasComponent },
  { path: 'navtab',     component:NavtabComponent },
  { path: 'login',      component:LoginComponent },
  { path: 'register',   component:RegisterComponent },
  { path: 'forgotpass', component:ForgotpassComponent },
  { path: 'politics', component:PoliticsComponent },
  { path:'**', component:DevelopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
