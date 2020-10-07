import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionThemeEditionThematiqueComponent } from './section-theme-edition-thematique.component';

describe('SectionThemeEditionThematiqueComponent', () => {
  let component: SectionThemeEditionThematiqueComponent;
  let fixture: ComponentFixture<SectionThemeEditionThematiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionThemeEditionThematiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionThemeEditionThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
