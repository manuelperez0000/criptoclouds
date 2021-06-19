import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import "rxjs";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DevelopComponent } from './views/develop/develop.component';
import { FooterComponent } from './components/footer/footer.component';
import { RemesasComponent } from './views/remesas/remesas.component';
import { CalcComponent } from './components/calc/calc.component';
import { NavtabComponent } from './components/navtab/navtab.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';
import { ForgotpassComponent } from './views/forgotpass/forgotpass.component';
import { MenuComponent } from './components/menu/menu.component';
import { PoliticsComponent } from './views/politics/politics.component';
import { DatoscompraComponent } from './views/datoscompra/datoscompra.component';
import { ContactComponent } from './views/contact/contact.component';
import { CalificationsComponent } from './views/califications/califications.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DatosventaComponent } from './views/datosventa/datosventa.component';
import { CriptosComponent } from './views/criptos/criptos.component';
import { ResguardaComponent } from './views/resguarda/resguarda.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    DevelopComponent,
    FooterComponent,
    RemesasComponent,
    CalcComponent,
    NavtabComponent,
    RegisterComponent,
    ForgotpassComponent,
    MenuComponent,
    PoliticsComponent,
    DatoscompraComponent,
    ContactComponent,
    CalificationsComponent,
    DashboardComponent,
    DatosventaComponent,
    CriptosComponent,
    ResguardaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
