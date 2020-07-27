import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchIdComponent } from './food2fork/search-id/search-id.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user-profile/user.component';
import { AuthGuard } from './auth/user-auth/auth-guard';
import { UserLikedComponent } from './user/user-liked/user-liked.component';
import { UserRecipiesComponent } from './user/user-recipies/user-recipies.component';


const routes: Routes = [
  { path : '', component : HomeComponent },
  { path: 'recipe/:id', component: SearchIdComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'liked', component: UserLikedComponent, canActivate: [AuthGuard]},
  { path: 'userRecipes', component: UserRecipiesComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: UserRecipiesComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
