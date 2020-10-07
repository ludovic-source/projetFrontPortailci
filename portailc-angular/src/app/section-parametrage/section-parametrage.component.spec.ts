import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionParametrageComponent } from './section-parametrage.component';

describe('SectionParametrageComponent', () => {
  let component: SectionParametrageComponent;
  let fixture: ComponentFixture<SectionParametrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionParametrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionParametrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
