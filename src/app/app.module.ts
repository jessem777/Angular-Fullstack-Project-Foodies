import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpResponse } from '@angular/common/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafePipe } from './safe.pipe';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SearchListComponent } from './food2fork/search-list/search-list.component';
import { SearchIdComponent } from './food2fork/search-id/search-id.component';
import { EventComponent } from './food2fork/search-list/event/event.component';
import { HomemadeComponent } from './food2fork/search-list/homemade/homemade.component';
import { TimeComponent } from './food2fork/search-list/time/time.component';
import { RankComponent } from './food2fork/search-list/rank/rank.component';
import { TitleComponent } from './home/title/title.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/user-auth/auth-interceptor';
import { UserComponent } from './user/user-profile/user.component';
import { UserRecipiesComponent } from './user/user-recipies/user-recipies.component';
import { UserLikedComponent } from './user/user-liked/user-liked.component';
import { PostsComponent } from './user/user-recipies/posts/posts.component';
import { RecipeService } from './user/user-recipies/recipe-service/recipe-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    SearchListComponent,
    SearchIdComponent,
    EventComponent,
    HomemadeComponent,
    TimeComponent,
    RankComponent,
    TitleComponent,
    SafePipe,
    SignupComponent,
    LoginComponent,
    UserComponent,
    UserRecipiesComponent,
    UserLikedComponent,
    PostsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [HttpResponse, RecipeService, BrowserModule, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
