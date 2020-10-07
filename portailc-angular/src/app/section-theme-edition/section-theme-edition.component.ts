import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ThemeService } from '../services/theme.service';
import { LienService } from '../services/lien.service';
import { EditionService } from '../services/edition.service';
import { Thematique } from '../models/Thematique';

@Component({
  selector: 'app-section-theme-edition',
  templateUrl: './section-theme-edition.component.html',
  styleUrls: ['./section-theme-edition.component.css']
})
export class SectionThemeEditionComponent implements OnInit {

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;

  constructor(private editionService: EditionService, private router: Router) { }

  ngOnInit(): void {
      this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
                        (indicateursEdition: any) => {
                                              this.indicateursEdition = indicateursEdition;
                                                    });
      this.editionService.emitIndicateursEditionSubject();
  }



}


