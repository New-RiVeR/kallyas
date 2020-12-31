import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ShopComponent } from '../shop/shop.component';
import { ContactComponent } from '../contact/contact.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AdminComponent } from '../admin/admin.component';
import { CartComponent } from '../cart/cart.component';

import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    HomeComponent,
    AboutComponent,
    ShopComponent,
    ContactComponent,
    NotFoundComponent,
    PlaceholderDirective,
    DropdownDirective,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    CartComponent
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    // HeaderComponent,
    // FooterComponent,
    // AdminComponent,
    // CartComponent,
    // HomeComponent,
    // AboutComponent,
    // ShopComponent,
    // ContactComponent,
    // NotFoundComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
