import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from '../app/services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import  { AuthService } from '../app/services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';



const appRoutes: Routes =[
  { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('id_token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })

    
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
