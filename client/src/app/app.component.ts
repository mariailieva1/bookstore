import {
  afterRender,
  AfterViewChecked,
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AuthService } from './services/auth/auth.service';
import { TagSelectionComponent } from './pages/tag-selection/tag-selection.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SnackbarComponent,
    TagSelectionComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showTagsSelection: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(async (_) => {
      this.showTagsSelection = !(await this.authService.userHasPreferences());
    });
  }
}
