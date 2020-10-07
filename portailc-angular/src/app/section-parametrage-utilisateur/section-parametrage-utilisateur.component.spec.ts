import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionParametrageUtilisateurComponent } from './section-parametrage-utilisateur.component';

describe('SectionParametrageUtilisateurComponent', () => {
  let component: SectionParametrageUtilisateurComponent;
  let fixture: ComponentFixture<SectionParametrageUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionParametrageUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionParametrageUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
