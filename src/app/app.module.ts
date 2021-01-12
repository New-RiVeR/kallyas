import { BrowserModule } from '@angular/platform-browser';
import { v4 as uuidv1 } from '../../node_modules/uuid';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { from } from 'rxjs';
import { MoreInfoDialog } from './more-info--dialog/more-info--dialog';
import { InputsErrorsComponent } from './admin/inputs-errors/inputs-errors.component';

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ShopComponent,
    ContactComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    CartComponent,
    MoreInfoDialog,
    InputsErrorsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {}
