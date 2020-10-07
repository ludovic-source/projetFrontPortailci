import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionThemeArbreComponent } from './section-theme-arbre.component';

describe('SectionThemeArbreComponent', () => {
  let component: SectionThemeArbreComponent;
  let fixture: ComponentFixture<SectionThemeArbreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionThemeArbreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionThemeArbreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
