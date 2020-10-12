import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuArborescentContainerComponent } from './menu-arborescent-container.component';

describe('MenuArborescentContainerComponent', () => {
  let component: MenuArborescentContainerComponent;
  let fixture: ComponentFixture<MenuArborescentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuArborescentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuArborescentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
