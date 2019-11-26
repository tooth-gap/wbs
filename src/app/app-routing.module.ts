import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ConsumerPageComponent } from './consumer-page/consumer-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path: 'transaction', component: TransactionPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'user', component: UserPageComponent},
  {path: 'consumer', component: ConsumerPageComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
