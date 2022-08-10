import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ServersComponent } from './components/servers/servers.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ServerEditComponent } from './components/server-edit/server-edit.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewserverComponent } from './components/newserver/newserver.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]  },
  { path: 'servers', component: ServersComponent, canActivate: [AuthGuard]  },
  { path: 'servers/:id', component: ServersComponent, canActivate: [AuthGuard]  },
  { path: 'useredit/:id', component: UserEditComponent, canActivate: [AuthGuard]  },
  { path: 'serveredit/:id', component: ServerEditComponent , canActivate: [AuthGuard] },
  { path: 'newuser', component: NewUserComponent, canActivate: [AuthGuard]  },
  { path: 'newserver', component: NewserverComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
