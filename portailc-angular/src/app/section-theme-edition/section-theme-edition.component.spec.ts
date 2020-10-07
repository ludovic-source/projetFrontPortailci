import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionThemeEditionComponent } from './section-theme-edition.component';

describe('SectionThemeEditionComponent', () => {
  let component: SectionThemeEditionComponent;
  let fixture: ComponentFixture<SectionThemeEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionThemeEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionThemeEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
