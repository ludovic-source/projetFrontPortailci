import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionParametrageProfilComponent } from './section-parametrage-profil.component';

describe('SectionParametrageProfilComponent', () => {
  let component: SectionParametrageProfilComponent;
  let fixture: ComponentFixture<SectionParametrageProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionParametrageProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionParametrageProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
