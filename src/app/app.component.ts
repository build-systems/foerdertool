import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChildrenOutletContexts,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarmobileComponent } from './navbarmobile/navbarmobile.component';
import { SupabaseService } from './shared/supabase.service';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './pages/profile/account/account.component';
import { FooterComponent } from './footer/footer.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    NavbarmobileComponent,
    HomeComponent,
    RouterModule,
    AuthComponent,
    AccountComponent,
    FooterComponent,
    DisclaimerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class AppComponent implements OnInit {
  // https://angular.dev/guide/components/host-elements

  // This part is to control if either the normal navbar or the navbarmobile should be loaded
  // See also the host at the top
  public screenWidth!: number;

  session = this.supabase.session;

  constructor(
    private readonly supabase: SupabaseService,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit() {
    // Get screen width
    this.screenWidth = window.innerWidth;
    // Update session observable
    this.supabase.authChanges((_, session) => (this.session = session));
    // console.log(this.session);
  }

  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  isMobile(screenWidth: number) {
    return screenWidth < 700;
  }
}
