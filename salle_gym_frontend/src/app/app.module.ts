import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardGerantComponent } from './pages/dashboard-gerant/dashboard-gerant.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ListeCustomersComponent } from './customers/liste-customers/liste-customers.component';
import { RechercheCustomersComponent } from './customers/recherche-customers/recherche-customers.component';
import { AddCustomersComponent } from './customers/add-customers/add-customers.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditCustomersComponent } from './customers/edit-customers/edit-customers.component';
import { AddOfferComponent } from './offers/add-offer/add-offer.component';
import { ListOffersComponent } from './offers/list-offers/list-offers.component';
import { SearchCustomersComponent } from './subscriptions/search-customers/search-customers.component';
import { ChoosePackComponent } from './subscriptions/choose-pack/choose-pack.component';
import { ListSubscriptionsComponent } from './subscriptions/list-subscriptions/list-subscriptions.component';
import { MyAccountComponent } from './account/my-account/my-account.component';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { AddUserComponent } from './admin/users/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { ChangePasswordComponent } from './admin/profile/change-password/change-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardGerantComponent,
    DashboardAdminComponent,
    SidebarComponent,
    NavbarComponent,
    ListeCustomersComponent,
    RechercheCustomersComponent,
    AddCustomersComponent,
    EditCustomersComponent,
    AddOfferComponent,
    ListOffersComponent,
    SearchCustomersComponent,
    ChoosePackComponent,
    ListSubscriptionsComponent,
    MyAccountComponent,
    SidebarAdminComponent,
    AddUserComponent,
    UserListComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing:true}),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






