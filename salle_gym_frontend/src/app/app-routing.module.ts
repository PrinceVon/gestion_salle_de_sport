import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardGerantComponent } from './pages/dashboard-gerant/dashboard-gerant.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ListeCustomersComponent } from './customers/liste-customers/liste-customers.component';
import { RechercheCustomersComponent } from './customers/recherche-customers/recherche-customers.component';
import { AddCustomersComponent } from './customers/add-customers/add-customers.component';
import {EditCustomersComponent } from './customers/edit-customers/edit-customers.component';
import {AddOfferComponent} from './offers/add-offer/add-offer.component';
import {ListOffersComponent} from './offers/list-offers/list-offers.component';
import {SearchCustomersComponent } from './subscriptions/search-customers/search-customers.component';
import {ChoosePackComponent } from './subscriptions/choose-pack/choose-pack.component';
import {ListSubscriptionsComponent } from './subscriptions/list-subscriptions/list-subscriptions.component';
import {MyAccountComponent } from './account/my-account/my-account.component';
import {AddUserComponent } from './admin/users/add-user/add-user.component';
import {UserListComponent } from './admin/users/user-list/user-list.component';
import {ChangePasswordComponent } from './admin/profile/change-password/change-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-gerant/:username', component: DashboardGerantComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-admin/:username', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'clients/liste', component: ListeCustomersComponent },
  { path: 'clients/recherche', component: RechercheCustomersComponent },
  { path: 'clients/ajouter', component: AddCustomersComponent },
  { path: 'edit-client/:id', component: EditCustomersComponent },
  { path: 'offres/ajouter', component: AddOfferComponent },
  { path: 'offres/liste', component: ListOffersComponent },
  { path: 'abonnements/souscrire', component: SearchCustomersComponent  },
  { path: 'abonnements/liste', component: ListSubscriptionsComponent  },
  { path: 'subscriptions/choose-pack/:customerId', component: ChoosePackComponent },
  { path: 'mon-compte/:username', component: MyAccountComponent },

  { path: 'admin/users/add', component: AddUserComponent },
  { path: 'admin/users/list', component: UserListComponent },
  { path: 'admin/profile/password', component: ChangePasswordComponent },




  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



