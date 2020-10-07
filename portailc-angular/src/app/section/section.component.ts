import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EditionService } from '../services/edition.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  idTheme: number;

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;

  constructor(private authService: AuthService,
              private editionService: EditionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.idTheme = this.route.snapshot.params['id'];
      this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
                        (indicateursEdition: any) => {
                                              this.indicateursEdition = indicateursEdition;
                                                    });
      this.editionService.emitIndicateursEditionSubject();
  }

  ngOnChanges(): void {
      this.idTheme = this.route.snapshot.params['id'];
  }

  getIsAuth() {
      return this.authService.getIsAuth();
  }

  getIdTheme() {
      this.idTheme = this.route.snapshot.params['id'];
      return this.idTheme;
  }

}
