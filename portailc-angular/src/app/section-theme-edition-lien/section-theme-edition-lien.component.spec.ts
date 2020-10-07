import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionThemeEditionLienComponent } from './section-theme-edition-lien.component';

describe('SectionThemeEditionLienComponent', () => {
  let component: SectionThemeEditionLienComponent;
  let fixture: ComponentFixture<SectionThemeEditionLienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionThemeEditionLienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionThemeEditionLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
