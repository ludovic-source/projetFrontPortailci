import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionArticleConnexionComponent } from './section-article-connexion.component';

describe('SectionArticleConnexionComponent', () => {
  let component: SectionArticleConnexionComponent;
  let fixture: ComponentFixture<SectionArticleConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionArticleConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionArticleConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
